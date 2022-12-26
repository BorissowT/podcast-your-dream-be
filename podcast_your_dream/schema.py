import graphene
import graphql_jwt

import playlists.schema
import podcasts.schema
import users.schema

import graphene
import graphql_jwt


class Query(users.schema.Query, podcasts.schema.Query, graphene.ObjectType):
    pass


class Mutation(users.schema.Mutation, podcasts.schema.Mutation, graphene.ObjectType):
    pass


schema = graphene.Schema(query=Query, mutation=Mutation)

