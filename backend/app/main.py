import uvicorn
from fastapi import Depends, FastAPI, HTTPException
from fastapi.responses import JSONResponse
from langchain_community.document_loaders import PyPDFLoader
from pydantic import BaseModel

from app.extraction import ProcurementRequestExractor
from app.repositories.procurement_repository import ProcurementRepository


class TextRequest(BaseModel):
    body: str


class PdfRequest(BaseModel):
    # TODO:
    body: str


app = FastAPI()

procurement_repository = ProcurementRepository()
# TODO: rename to extract_text
extract = ProcurementRequestExractor()
extract_pdf = ProcurementRequestExractor()


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


def pdf2txt(path: str) -> str:
    loader = PyPDFLoader("file1.pdf")
    pages = loader.load_and_split()
    return pages[0].page_content


@app.post("/procurement-documents/{uuid}")
async def post_document(
    uuid: str,
    request: PdfRequest,
    procurement_repository: ProcurementRepository = Depends(
        lambda: procurement_repository
    ),
):
    # TODO: error response if uuid is already stored
    body = request.body
    # TODO: save the PDF
    pdf_path = "./documents/AN-4120-Kdnr-14918.pdf"
    text_body = pdf2txt(pdf_path)
    procurement_request = extract(text_body)
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
