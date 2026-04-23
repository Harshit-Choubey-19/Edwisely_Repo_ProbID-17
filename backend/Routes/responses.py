from fastapi import APIRouter
from Config.db import responses_collection
from Models.form import ResponseModel

router = APIRouter()

@router.post("/responses")
async def submit_response(response: ResponseModel):
    try:
        res_dict = response.dict()
        await responses_collection.insert_one(res_dict)
        return {"message": "Response saved Successfully!", "data": {"form_id": response.form_id}}
    except Exception as e:
        print(f"Error saving response: {e}")
        return {"error": "Internal Server Error"}

@router.get("/responses/{form_id}")
async def get_responses(form_id: str):
    try:
        cursor = responses_collection.find({"form_id": form_id})
    
        responses = []
        async for doc in cursor:
          doc["_id"] = str(doc["_id"])
          responses.append(doc)
    
        return {"message": "Responses retrieved successfully!", "responses": responses}
    except Exception as e:
        print(f"Error retrieving responses: {e}")
        return {"error": "Internal Server Error"}