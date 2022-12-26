import graphene
import graphql_jwt

import playlists.schema
import podcasts.schema
import users.schema

import graphene
import graphql_jwt


class Query(users.schema.Query, podcasts.schema.Query, playlists.schema.Query, graphene.ObjectType):
    pass


class Mutation(users.schema.Mutation, podcasts.schema.Mutation, playlists.schema.Mutation, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

