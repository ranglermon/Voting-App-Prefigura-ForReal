from django.shortcuts import render

# Create your views here.

from django.shortcuts import render
def index_election(request, election):
    return render(request, 'frontend/election.html')
