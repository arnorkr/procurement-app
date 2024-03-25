from app.models import Position, ProcurementRequest


# TODO: cover repository logic with unit tests
class ProcurementRepository:
    def __init__(self):
        request = ProcurementRequest(
            requestor_name="Adobe Systems",
            description="Adobe Creative Cloud Subscription",
            vendor_name="Adobe Systems",
            department="HR",
            positions=[
                Position(
                    description="Adobe Photoshop Licence",
                    unit_price=200.0,
                    amount=5.0,
                    unit="Licence",
                    total_price=1000.0,
                )
            ],
            total_cost=3000.0,
            vatin="DE123456789",
            commodity_group="Software Licences",
            status="open",
            uuid="ca263d62-2aab-4350-9656-0e6ac1ea3e21",
        )
        print(request)
        self.requests = {"ca263d62-2aab-4350-9656-0e6ac1ea3e21": request}

    # TODO: add support for paging
    def get_requests(self) -> list[dict]:
        return [instance.dict() for instance in self.requests.values()]

    def get_request(self, uuid: str) -> dict:
        return self.requests[uuid].dict()

    def delete_request(self, uuid: str) -> dict:
        request = self.requests[uuid]
        del self.requests[uuid]
        return request.dict()

    def add_request(self, uuid: str, request: ProcurementRequest) -> dict:
        request.uuid = uuid
        self.requests[uuid] = request
        return request.dict()

    def update_request(self, uuid: str, in_request: dict) -> dict:
        request = self.requests[uuid]
        for k, v in in_request.items():
            # TODO: verify attributes
            setattr(request, k, v)
        self.requests[uuid] = request
        return request.dict()
