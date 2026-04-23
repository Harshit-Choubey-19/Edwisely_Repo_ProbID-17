from fastapi import APIRouter
from Config.db import forms_collection
from Models.form import Form
from bson import ObjectId

router = APIRouter()

@router.post("/forms")
async def create_form(form: Form):
    try:
        form_dict = form.dict()
        result = await forms_collection.insert_one(form_dict)
        return {"message": "Form created Successfully!" , "form_id": str(result.inserted_id)}
    except Exception as e:
        print(f"Error creating form: {e}")
        return {"error": "Internal Server Error"}

@router.get("/forms/{form_id}")
async def get_form(form_id: str):
    try:
        form = await forms_collection.find_one({"_id": ObjectId(form_id)})
    
        if form:
          form["_id"] = str(form["_id"])
        return {"message": "Form retrieved successfully!", "form": form}
    except Exception as e:
        print(f"Error retrieving form: {e}")
        return {"error": "Internal Server Error"}