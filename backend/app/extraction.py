import os
import re
from typing import Optional

from langchain.chains import create_tagging_chain
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI

from app.models import ProcurementRequest


def valid_vat(text):
    regex_pattern = r"^[A-Za-z]{2,4}(?=.{2,12}$)[-_\s0-9]*(?:[a-zA-Z][-_\s0-9]*){0,2}$"
    return bool(re.match(regex_pattern, text))


class ProcurementRequestExractor:
    def __init__(self):
        # Define a custom prompt to provide instructions and any additional context.
        # 1) You can add examples into the prompt template to improve extraction quality
        # 2) Introduce additional parameters to take context into account (e.g., include metadata
        #    about the document from which the text was extracted.)
        prompt = ChatPromptTemplate.from_messages(
            [
                (
                    "system",
                    "You are an expert extraction algorithm. "
                    "Your task is to create a procurement request from a vendor offer."
                    "Only extract relevant information from the text. "
                    "If you do not know the value of an attribute asked to extract return null for the attribute's value.",
                ),
                # Please see the how-to about improving performance with
                # reference examples.
                # TODO: add examples
                # MessagesPlaceholder('examples'),
                ("human", "{text}"),
            ]
        )

        llm = ChatOpenAI(
            # TODO: is there a better way to do this?
            openai_api_key=os.environ["OPENAI_API_KEY"],
            temperature=0,
        )

        self.runnable = prompt | llm.with_structured_output(schema=ProcurementRequest)
        schema = {
            "properties": {
                "commodity_group": {
                    "type": "string",
                    "enum": [
                        "General Services",
                        "Facility Management",
                        "Publishing Production",
                        "Information Technology",
                        "Logistics",
                        "Marketing & Advertising",
                        "Production",
                    ],
                    "description": "The category or group the requested items/services belong to.",
                },
            },
            "required": ["commodity_group"],
        }
        self.chain = create_tagging_chain(schema, llm)

    def __call__(self, text: str) -> Optional[ProcurementRequest]:
        req = self.runnable.invoke({"text": text})
        req.commodity_group = self.chain.run(text)["commodity_group"]
        if not valid_vat(req.vatin):
            req.vatin = None
        return req