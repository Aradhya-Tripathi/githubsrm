from typing import Dict
from rest_framework import response, status
from math import ceil
from .models import AdminEntry

def project_Pagination(request, **kwargs):
    """
        Send paginated projects here

        Using values from query params for page number

        Args:
            request

        Returns:
            response.Response
    """
    ITEMS_PER_PAGE=10
    page = int(request.GET["page"])
    entry=AdminEntry()
    totalItems= entry.db.project.count_documents({})
    record = list(entry.db.project.aggregate([
        {"$skip": (page - 1) * ITEMS_PER_PAGE},
        {"$limit": ITEMS_PER_PAGE},
    ]))
    if len(record)!=0:
        return response.Response({
            "currentPage": page,
            "hasNextPage": ITEMS_PER_PAGE * page < totalItems,
            "hasPreviousPage": page > 1,
            "nextPage": page + 1,
            "previousPage": page - 1,
            "lastPage": ceil(totalItems / ITEMS_PER_PAGE),
            "records": record
        }, status=status.HTTP_200_OK)
    return response.Response("Page does not exist",status=status.HTTP_400_BAD_REQUEST)


def project_SingleProject(request, **kwargs):
    """
        Send single project but detailed
    """
    return response.Response(status=status.HTTP_200_OK)


def get_token(request_header: Dict[str, str]):
    try:
        token = request_header.get('Authorization').split()
        return token[0], token[1]
    except Exception as e:
        return False
