# import graphene
# from django.db.models import Q
# from graphene_django import DjangoObjectType
#
# from playlists.models import Playlist
#
#
# class PlaylistType(DjangoObjectType):
#     class Meta:
#         model = Playlist
#
#
# class Query(graphene.ObjectType):
#     # Add the search parameter inside our links field
#     playlists = graphene.List(
#         PlaylistType,
#         search=graphene.String(),
#         first=graphene.Int(),
#         skip=graphene.Int(),
#     )
#
#     def resolve_playlists(self, info, search=None, first=None, skip=None, **kwargs):
#         qs = Playlist.objects.all()
#
#         if search:
#             filter = (
#                 Q(title__icontains=search)
#             )
#             qs = qs.filter(filter)
#
#         if skip:
#             qs = qs[skip:]
#
#         if first:
#             qs = qs[:first]
#
#         return qs
