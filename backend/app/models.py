from typing import List, Optional

from langchain_core.pydantic_v1 import BaseModel, Field


class Position(BaseModel):
    """A position from the offer."""

    description: Optional[str] = Field(
        ..., description="Description of the item/service"
    )
    unit_price: Optional[float] = Field(
        ..., description="Price per unit/item/service in euro"
    )
    amount: Optional[float] = Field(
        ..., description="The quantity or number of units being ordered"
    )
    unit: Optional[str] = Field(..., description="The unit of measure or quantity")
    total_price: Optional[float] = Field(
        ...,
        description="The Total price for this line (Unit Price x amount). If the total price is not stated, this field should be left empty.",
    )


class ProcurementRequest(BaseModel):
    """If users want to buy a product or service they need to create a formal request to the procurement department, which will afterwards process this request."""

    # TODO: VAT ID
    # TODO: Commodity group
    # TODO: make requestor name be an input field in the GUI
    # requestor_name: Optional[str] = Field(
    #     ...,
    #     description="Full name of the person submitting the request. If the name of the person is unknown, the name should be left empty.",
    # )
    description: Optional[str] = Field(
        ..., description="Brief description of the product/service requested."
    )
    vendor_name: Optional[str] = Field(
        ...,
        description="The name of the vendor providing the items/services.",
    )
    positions: List[Position]
    department: Optional[str] = Field(
        ...,
        description="The Department of the Requestor. If the name of the department is unknown, this field should be left empty",
    )
    total_cost: Optional[float] = Field(
        ...,
        description="Estimated total cost of the request. If the total cost is not stated, this field should be left empty.",
    )
    vatin: Optional[str] = Field(
        ...,
        description="The VAT identification number. In German, this is called Umsatzsteuer-Identifikationsnummer and often abbrevieted as USt-IdNr or UID. If the total price is not stated, this field should be left empty.",
    )
