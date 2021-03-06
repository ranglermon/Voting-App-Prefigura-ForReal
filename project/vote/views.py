from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from vote.models import Election
from django.contrib.auth.models import User
from vote.serializers import *
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from rest_framework.authtoken.models import Token
from rest_framework import generics
from rest_framework.response import Response
from django.shortcuts import render, redirect, HttpResponse
from django.http import JsonResponse
from django.middleware.csrf import get_token
from django.template import Context




class ElectionListCreate(generics.ListCreateAPIView):
    queryset = Election.objects.all()
    serializer_class = ElectionSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("Election_Id",)
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

        # check if many is required
            if isinstance(data, list):
                kwargs["many"] = True
        return super(ElectionListCreate, self).get_serializer(*args, **kwargs)


class AlternativeListCreate(generics.ListCreateAPIView):
    queryset = Alternative.objects.all()
    serializer_class = AlternativeSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("Election_Id",)
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

        # check if many is required
            if isinstance(data, list):
                kwargs["many"] = True
        return super(AlternativeListCreate, self).get_serializer(*args, **kwargs)

class QuestionListCreate(generics.ListCreateAPIView):
    queryset = Question.objects.all()
    serializer_class = QuestionSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("Election_Id",)
    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

        # check if many is required
            if isinstance(data, list):
                kwargs["many"] = True
        return super(QuestionListCreate, self).get_serializer(*args, **kwargs)

class VoteListCreate(generics.ListCreateAPIView):
    queryset = Vote.objects.all()
    serializer_class = VoteSerializer
    filter_backends = (filters.SearchFilter,)
    search_fields = ("Election_Id",)

    def get_serializer(self, *args, **kwargs):
        if "data" in kwargs:
            data = kwargs["data"]

		# check if many is required
            if isinstance(data, list):
                kwargs["many"] = True
        return super(VoteListCreate, self).get_serializer(*args, **kwargs)

class RegistrationAPI(generics.GenericAPIView):
    serializer_class = CreateUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        return Response({
        'user': UserSerializer(user, context=self.get_serializer_context()).data,
        'token': Token.objects.create(user=user)
        })

class LoginAPI(generics.GenericAPIView):
    serializer_class = LoginUserSerializer

    def post(self, request, *args, **kwargs):
        serializer = self.get_serializer(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.validated_data
        return Response({
            "user": UserSerializer(user, context=self.get_serializer_context()).data,
            "token": Token.objects.create(user=user).key
        })

def signup(request):
    if request.method == 'POST':
        form = UserCreationForm(request.POST)
        if form.is_valid():
            form.save()
            username = form.cleaned_data.get('username')
            raw_password = form.cleaned_data.get('password1')
            user = authenticate(username=username, password=raw_password)
            login(request, user)
            return redirect('')
    else:
        form = UserCreationForm()
    return render(request, 'registration/signup.html', {'form': form})

def profile(request):
    return HttpResponse("I'm sorry, but you'll have to do javascript work here ;(")

def get_result(request, election_id):

    election = Election.objects.get(Election_Id=election_id)
    questions = Question.objects.filter(Election_Id=election_id)
    votes = Vote.objects.filter(Election_Id=election_id)
    alternatives = Alternative.objects.filter(Election_Id=election_id)

    didiTWork =[]

    for x in alternatives:
        didiTWork.append(x.Question_Id)

    #return HttpResponse(didiTWork)
    questionAndVotes = {}
    #Dynamically creates the dict/array structure
    for quest in questions:
        print ("Hey I am" + str(quest))
        questionAndVotes[quest.Question_Id] = {}
        for alt in alternatives:
            if alt.Question_Id == quest.Question_Id:
                print ("Hey I am" + "alt" + str(alt))
                questionAndVotes[quest.Question_Id][alt.Alternative_Id] = []
    #Adds vote objects
    for quest in questions:
        for vote in votes:
            if vote.Question_Id == quest.Question_Id:
                questionAndVotes[quest.Question_Id][vote.Alternative_Id].append(vote.Vote_Value)

    #calculates results
    results = {}
    print(str(questionAndVotes))
    for quest in questionAndVotes:
        results[quest] = {}
        if questions[quest].Election_Method == "Range":
            results[quest]["method"] = "range"
            results[quest]["wording"] = questions[quest].Question_Wording
            for alt in questionAndVotes[quest]:
                results[quest][alt] = 0
                voteCount = 0
                for vote in questionAndVotes[quest][alt]:
                    voteCount = voteCount + vote
                results[quest][alt] = {}
                results[quest][alt]["alternativeWording"] = alternatives.get(Question_Id=quest, Alternative_Id=alt).Alternative_Wording
                results[quest][alt]["voteAverage"] = voteCount / len(questionAndVotes[quest][alt])

        elif questions[quest].Election_Method == "Majority":
            results[quest]["method"] = "majority"
            for alt in questionAndVotes[quest]:
                results[quest][alt] = 0
                voteCount = 0
                for vote in questionAndVotes[quest][alt]:
                    voteCount = voteCount + vote
                results[quest][alt] = {}
                print(str(quest) + str(alt) + "I am in the majority")
                results[quest][alt]["alternativeWording"] = alternatives.get(Question_Id=quest, Alternative_Id=alt).Alternative_Wording
                results[quest][alt]["voteCount"] = voteCount
        else:
            results[quest]["method"] = "approval"
            for alt in questionAndVotes[quest]:
                results[quest][alt] = 0
                voteCount = 0
                for vote in questionAndVotes[quest][alt]:
                    voteCount = voteCount + vote
                results[quest][alt] = {}
                results[quest][alt]["alternativeWording"] = alternatives.get(Question_Id=quest, Alternative_Id=alt).Alternative_Wording
                results[quest][alt]["voteCount"] = voteCount


    context = {'election': election, 'results': results}
    print(str(results))
    return render(request, 'get_result.html', context)
