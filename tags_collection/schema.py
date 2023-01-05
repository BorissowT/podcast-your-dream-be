import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from graphql import GraphQLError

from tags_collection.models import TagsCollection
from users.schema import UserType


class TagsCollectionType(DjangoObjectType):
    class Meta:
        model = TagsCollection


class Query(graphene.ObjectType):
    # Add the search parameter inside our links field
    tags_collections = graphene.List(
        TagsCollectionType,
        search=graphene.String(),
        first=graphene.Int(),
        skip=graphene.Int(),
    )

    def resolve_tags_collections(self, info, search=None, first=None, skip=None, **kwargs):
        user = info.context.user or None
        if user.is_anonymous:
            raise GraphQLError('You must be logged to see tag lists!')
        if user.is_staff:
            qs = TagsCollection.objects.all()
        else:
            qs = TagsCollection.objects.filter(user=user).all()

        if search:
            filter = (
                Q(title__icontains=search)
            )
            qs = qs.filter(filter)

        if skip:
            qs = qs[skip:]

        if first:
            qs = qs[:first]

        return qs


class CreateTagsCollection(graphene.Mutation):
    id = graphene.Int()
    title = graphene.String()
    tags = graphene.List(graphene.String)
    user = graphene.Field(UserType)

    class Arguments:
        title = graphene.String()
        tags = graphene.List(graphene.String)

    def mutate(self, info, title, tags):
        user = info.context.user or None

        tagsCollection = TagsCollection(
            user=user,
            title=title,
            tags=tags
        )
        tagsCollection.save()

        return CreateTagsCollection(
            id=tagsCollection.id,
            title=tagsCollection.title,
            tags=tagsCollection.tags,
            user=tagsCollection.user
        )


class Mutation(graphene.ObjectType):
    create_tags_collection = CreateTagsCollection.Field()
