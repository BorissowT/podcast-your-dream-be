import graphene
import graphql_jwt

import playlists.schema
import podcasts.schema
import tags_collection.schema
import users.schema

import graphene
import graphql_jwt


class Query(users.schema.Query, podcasts.schema.Query, playlists.schema.Query, tags_collection.schema.Query, graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


class Mutation(users.schema.Mutation, podcasts.schema.Mutation, playlists.schema.Mutation,
               tags_collection.schema.Mutation,
               graphene.ObjectType):
    token_auth = graphql_jwt.ObtainJSONWebToken.Field()
    verify_token = graphql_jwt.Verify.Field()
    refresh_token = graphql_jwt.Refresh.Field()


schema = graphene.Schema(query=Query, mutation=Mutation)

