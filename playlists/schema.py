import graphene
from django.db.models import Q
from graphene_django import DjangoObjectType
from graphql import GraphQLError

from playlists.models import Playlist
from podcasts.models import Podcast
from podcasts.schema import PodcastType
from users.schema import UserType


class PlaylistType(DjangoObjectType):
    class Meta:
        model = Playlist


class Query(graphene.ObjectType):
    # Add the search parameter inside our links field
    playlists = graphene.List(
        PlaylistType,
        search=graphene.String(),
        first=graphene.Int(),
        skip=graphene.Int(),
    )

    def resolve_playlists(self, info, search=None, first=None, skip=None, **kwargs):
        user = info.context.user or None
        if user.is_anonymous:
            raise GraphQLError('You must be logged to see playlists!')
        if user.is_staff:
            qs = Playlist.objects.all()
        else:
            qs = Playlist.objects.filter(user=user).all()
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


class CreatePlaylist(graphene.Mutation):
    id = graphene.Int()
    title = graphene.String()
    user = graphene.Field(UserType)

    class Arguments:
        title = graphene.String()

    def mutate(self, info, title):
        user = info.context.user or None

        playlist = Playlist(
            user=user,
            title=title,
        )
        playlist.save()

        return CreatePlaylist(
            id=playlist.id,
            title=playlist.title,
            user=playlist.user
        )


class AddPodcastToPlaylist(graphene.Mutation):
    user = graphene.Field(UserType)
    podcast = graphene.Field(PodcastType)
    playlist = graphene.Field(PlaylistType)

    class Arguments:
        podcast_id = graphene.Int()
        playlist_id = graphene.Int()

    def mutate(self, info, podcast_id, playlist_id):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('You must be logged to add podcasts to playlists!')

        podcast = Podcast.objects.filter(id=podcast_id).first()
        if not podcast:
            raise Exception('Invalid Podcast!')
        playlist = Playlist.objects.filter(id=playlist_id).first()
        if playlist.user != user:
            raise Exception('not allowed')
        if not playlist:
            raise Exception('Invalid Playlist!')

        playlist.podcasts.add(podcast)
        playlist.save()

        return AddPodcastToPlaylist(user=user, podcast=podcast, playlist=playlist)


#4
class Mutation(graphene.ObjectType):
    create_playlist = CreatePlaylist.Field()
    add_podcast_to_playlist = AddPodcastToPlaylist.Field()
