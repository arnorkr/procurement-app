import os
from typing import Optional

from app.models import ProcurementRequest
from langchain_core.prompts import ChatPromptTemplate
from langchain_openai import ChatOpenAI


class ProcurementRequestExractor:
    def __init__(self):
        # Define a custom prompt to provide instructions and any additional context.
        # 1) You can add examples into the prompt template to improve extraction quality
        # 2) Introduce additional parameters to take context into account (e.g., include metadata
        #    about the document from which the text was extracted.)
        self.prompt = ChatPromptTemplate.from_messages(
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

        self.llm = ChatOpenAI(
            # TODO: is there a better way to do this?
            openai_api_key=os.environ["OPENAI_API_KEY"],
            temperature=0,
        )

        self.runnable = self.prompt | self.llm.with_structured_output(
            schema=ProcurementRequest
        )

    def __call__(self, text: str) -> Optional[ProcurementRequest]:
        return self.runnable.invoke({"text": text})
