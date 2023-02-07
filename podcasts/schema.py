import graphene
from graphene_django import DjangoObjectType
from django.db.models import Q
from graphql import GraphQLError

from playlists.models import Playlist
from podcasts.models import Podcast


class PodcastType(DjangoObjectType):
    class Meta:
        model = Podcast


class Query(graphene.ObjectType):
    # Add the search parameter inside our links field
    podcasts = graphene.List(
        PodcastType,
        search=graphene.String(),
        first=graphene.Int(),
        skip=graphene.Int(),
    )

    # Change the resolver
    def resolve_podcasts(self, info, search=None, first=None, skip=None, **kwargs):
        qs = Podcast.objects.all()

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

# 1: Defines a mutation class. Right after, you define the output of the mutation,
# the data the server can send back to the client. The output is defined field by field for learning purposes.
# In the next mutation you’ll define them as just one.

# 2: Defines the data you can send to the server, in this case, the links’ url and description.

# 3: The mutation method: it creates a link in the database using the data sent by the user,
# through the url and description parameters. After, the server returns the CreateLink class
# with the data just created. See how this matches the parameters set on #1.


#4: Creates a mutation class with a field to be resolved, which points to our mutation defined before.


# ...code
# 1
class CreatePodcast(graphene.Mutation):
    id = graphene.Int()
    link_to_api = graphene.String()
    title = graphene.String()

    class Arguments:
        link_to_api = graphene.String()
        title = graphene.String()
        # playlist_id = graphene.Int()

    def mutate(self, info, link_to_api, title, playlist_id=4):
        user = info.context.user
        if user.is_anonymous:
            raise GraphQLError('You must be logged to add podcasts to playlists!')
        playlist = Playlist.objects.filter(id=playlist_id).first()
        if playlist.user != user:
            raise Exception('not allowed')
        if not playlist :
            raise Exception('Invalid Playlist!')

        podcast = Podcast(
            link_to_api=link_to_api,
            title=title,
        )
        podcast.save()
        playlist.podcasts.add(podcast)
        playlist.save()

        return CreatePodcast(
            id=podcast.id,
            link_to_api=podcast.link_to_api,
            title=podcast.title,
        )


#4
class Mutation(graphene.ObjectType):
    create_podcast = CreatePodcast.Field()



