import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from pydantic import BaseModel

from app.extraction import ProcurementRequestExractor
from app.repositories.procurement_repository import ProcurementRepository


class TextRequest(BaseModel):
    body: str


app = FastAPI()

procurement_repository = ProcurementRepository()
extract = ProcurementRequestExractor()


@app.get("/healthz")
async def root():
    return "OK"


# TODO: unit test with a mock procurement repository
# TODO: add HATEOAS links to responses and add support for paging
@app.get("/procurement-requests")
async def get_procurement_requests(
    limit: int = 20,
    status: str = "",
    procurement_repository: ProcurementRepository = Depends(
        lambda: procurement_repository
    ),
):
    requests = procurement_repository.get_requests()
    return JSONResponse(requests, status_code=200)


@app.get("/procurement-requests/{uuid}")
async def get_procurement_request(
    uuid: str,
    procurement_repository: ProcurementRepository = Depends(
        lambda: procurement_repository
    ),
):
    try:
        request = procurement_repository.get_request(uuid)
        return JSONResponse(request, status_code=200)
    except KeyError:
        raise HTTPException(status_code=404, detail="Procurement request not found")


@app.post("/procurement-requests/{uuid}")
async def post_request(
    uuid: str,
    request: TextRequest,
    procurement_repository: ProcurementRepository = Depends(
        lambda: procurement_repository
    ),
):
    # TODO: error response if uuid is already stored
    body = request.body
    procurement_request = extract(body)
    if procurement_request is None:
        raise HTTPException(status_code=400, detail="Bad Request")
    return JSONResponse(
        procurement_repository.add_request(uuid, procurement_request),
        status_code=200,
    )


@app.delete("/procurement-requests/{uuid}")
async def delete_request(
    uuid: str,
    procurement_repository: ProcurementRepository = Depends(
        lambda: procurement_repository
    ),
):
    try:
        request = procurement_repository.delete_request(uuid)
        return JSONResponse(request, status_code=200)
    except KeyError:
        raise HTTPException(status_code=404, detail="Procurement Request not found")


if __name__ == "__main__":
    uvicorn.run("app.main:app", host="0.0.0.0", port=5001, reload=True)