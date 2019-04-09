from rest_framework import serializers
from vote.models import *
from django.contrib.auth import authenticate


class ElectionListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        elections = [Election(**item) for item in validated_data]
        return Election.objects.bulk_create(elections)


class ElectionSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        elections = [Election(**item) for item in validated_data]
        return Election.objects.bulk_create(elections)
    class Meta:
        list_serializer_class = ElectionListSerializer
        model = Election
        fields = ("Description", "Election_Id", "Election_Creator")

class QuestionListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        questions = [Question(**item) for item in validated_data]
        return Question.objects.bulk_create(questions)


class QuestionSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        questions = [Question(**item) for item in validated_data]
        return Question.objects.bulk_create(questions)
    class Meta:
        list_serializer_class = QuestionListSerializer
        model = Question
        fields = ("__all__")

class AlternativeListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        alternatives = [Alternative(**item) for item in validated_data]
        return Alternative.objects.bulk_create(alternatives)

class AlternativeSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        alternatives = [Alternative(**item) for item in validated_data]
        return Alternative.objects.bulk_create(alternatives)
    class Meta:
        list_serializer_class = AlternativeListSerializer
        model = Alternative
        fields = ("Alternative_Wording",  "Election_Id", "Question_Id", "Alternative_Id")

class VoteListSerializer(serializers.ListSerializer):
    def create(self, validated_data):
        votes = [Vote(**item) for item in validated_data]
        return Vote.objects.bulk_create(votes)


class VoteSerializer(serializers.ModelSerializer):
    def create(self, validated_data):
        votes = [Vote(**item) for item in validated_data]
        return votes.objects.bulk_create(votes)
    class Meta:
        list_serializer_class = VoteListSerializer
        model = Vote
        fields = ("__all__")

class CreateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username', 'password')
        extra_kwargs = {'password': {'write_only': True}}

    def create(self, validated_data):
        user = User.objects.create_user(validated_data['username'],
                                        None,
                                        validated_data['password'])
        return user

class LoginUserSerializer(serializers.Serializer):
    username = serializers.CharField()
    password = serializers.CharField()

    def validate(self, data):
        user = authenticate(**data)
        if user and user.is_active:
            return user
        raise serializers.ValidationError("Unable to log in with provided credentials.")

class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('id', 'username')
