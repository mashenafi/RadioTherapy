"""
Create views for Players_Attribute_Backend project.
"""
from rest_framework import status
# from django.shortcuts import render
from rest_framework.response import Response
from rest_framework.decorators import api_view
from .models import Treatment
from .serializer import TreatmentSerializer


@api_view(['GET', 'POST', 'PUT', 'DELETE'])
def treatment_list(request):
    # handle path: api/
    if request.method == 'GET':
        app = Treatment.objects.all()
        serializer = TreatmentSerializer(app, many=True)
        return Response(serializer.data)

    elif request.method == 'POST':
        plans = request.data.get('plans')

        # Create an plans from the above data
        serializer = TreatmentSerializer(data=plans)
        if serializer.is_valid(raise_exception=True):
            plan_saved = serializer.save()
            return Response({"success": "Treatment Plan created successfully. MRN:" + plan_saved.MRN}, status.HTTP_200_OK)
        else:
            return Response(
                {"error": "Failed to add treatment plan to database. Please make sure you fill the form correctly. If the problem persists please reach out to the developer."},
                status.HTTP_400_BAD_REQUEST
            )

    elif request.method == 'PUT':
        plans = request.data.get('plans')
        plan_id = request.data.get('id')

        # update plans with the above data
        try:
            plan_obj = Treatment.objects.get(id=plan_id)
            serializer = TreatmentSerializer(plan_obj, data=plans)
            if serializer.is_valid(raise_exception=True):
                serializer.save()
                return Response({"success": "Treatment Plan updated successfully. MRN:" + plan_obj.MRN}, status.HTTP_200_OK)
        except:
            return Response(
                {"error": "Failed to update treatment plan to database. Please make sure you fill the form correctly. If the problem persists please reach out to the developer."},
                status.HTTP_400_BAD_REQUEST
            )

    elif request.method == 'DELETE':
        plan_id = request.data.get('id')

        # delete plans with the above id
        try:
            plan_obj = Treatment.objects.get(id=plan_id)
            Treatment.delete(plan_obj)
            return Response({"success": "Treatment Plan deleted successfully"}, status.HTTP_200_OK)
        except:
            return Response(
                {"error": "Failed to update treatment plan to database. If the problem persists please reach out to the developer."},
                status.HTTP_204_NO_CONTENT
            )
