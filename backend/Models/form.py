from pydantic import BaseModel
from typing import List, Optional, Any

class Question(BaseModel):
    id: str
    question: str
    type: str
    options: Optional[List[str]] = []

class Form(BaseModel):
    title: str
    description: Optional[str] = ""
    questions: List[Question]

class Answer(BaseModel):
    question_id: str
    answer: Any   

class ResponseModel(BaseModel):
    form_id: str
    answers: List[Answer]