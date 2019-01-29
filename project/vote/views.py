from django.shortcuts import render
from django_filters.rest_framework import DjangoFilterBackend
from rest_framework import filters
from vote.models import Election
from vote.serializers import *
from django.contrib.auth import login, authenticate
from django.contrib.auth.forms import UserCreationForm
from rest_framework import generics
from django.shortcuts import render, redirect, HttpResponse


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
    votes = Vote.objects.filter(Election_Id=election_id)
    alternatives = Alternative.objects.filter(Election_Id=election_id)

    alternative_value_list = {}
    test = alternative_value_list

    for x in alternatives:
        alternative_value_list[x] = 0



    return render(request, 'get_result.html', {'election': election }, {'alternative_value_list': alternative_value_list})
