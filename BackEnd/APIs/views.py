from datetime import datetime,timedelta
from django.utils import timezone
from .models import Users
from .serializers import UsersSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.core.exceptions import ObjectDoesNotExist
from hashlib import md5
import jwt 

class createUserAPIView(APIView):
    def get(self,request):
        user = Users.objects.all()
        serializer = UsersSerializer(user,many=True)
        return Response(serializer.data,status=status.HTTP_201_CREATED)

    def post(self,request,*args, **kwargs):
        serialized = UsersSerializer(data=request.data)
        serialized.is_valid()
        if(serialized.is_valid()):
            password = serialized.validated_data['password']
            hashpass = md5(password.encode('utf8')).hexdigest()
            serialized.validated_data['password'] = hashpass
            serialized.save()
            response_data = {
                "message": "User Created. Please Log in!",
                "results": {
                },
                "success": True
            }
            return Response(response_data,status=status.HTTP_201_CREATED)
        else:
            response_data = {
                "message": serialized.errors,
                "results": {},
                "success": False
            }
            return Response(response_data,status=status.HTTP_400_BAD_REQUEST)
      

class AuthenticateUserAPIView(APIView):
    def post(self,request,*args, **kwargs):
        try:
            username = request.data['username']
            password = request.data['password']
            hashpass = md5(password.encode('utf8')).hexdigest()
            password = hashpass
            if '@' in username:
                try:
                    user = Users.objects.get(email = username, password = password)
                    if user:
                        userDetails = {
                            "username":user.username,
                            "name":user.name,
                            "email":user.email,
                            "exp":datetime.now(tz=timezone.utc)+timedelta(days=2)
                        }
                        encoded_jwt = jwt.encode(userDetails, "secret", algorithm="HS256")      
                        response_data = {
                            "message": "User logged In Successfully",
                            "results": {
                                "access token":encoded_jwt
                            },
                            "success": True
                        }
                        return Response(response_data,status=status.HTTP_200_OK)
                except ObjectDoesNotExist:
                    response_data = {
                        "message": "User not Found, Please Try Again",
                        "results": {},
                        "success": False
                    }
                    return Response(response_data,status=status.HTTP_404_NOT_FOUND)
            else:
                try:
                    user = Users.objects.get(username = username, password = password)
                    if user:
                        userDetails = {
                            "username":user.username,
                            "name":user.name,
                            "email":user.email,
                            "exp":datetime.now(tz=timezone.utc)+timedelta(days=2)
                        }
                        encoded_jwt = jwt.encode(userDetails, "secret", algorithm="HS256")           
                        print("access token",encoded_jwt)        
                        response_data = {
                            "message": "User logged In Successfully",
                            "results": {
                                "access token":encoded_jwt
                            },
                            "success": True
                        }
                        return Response(response_data,status=status.HTTP_200_OK)
                except ObjectDoesNotExist:
                    response_data = {
                        "message": "User not Found, Please Try Again",
                        "results": {},
                        "success": False
                    }
                    return Response(response_data,status=status.HTTP_404_NOT_FOUND)
        except KeyError:
            response_data = {
                "message": "Please Provide a username and Password",
                "results": {},
                "success": False
            }
            return Response(response_data,status=status.HTTP_400_BAD_REQUEST)
