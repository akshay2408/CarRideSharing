# from rest_framework import permissions


# class IsClientOrDriver(permissions.BasePermission):
#     """
#     Custom permission so users/agents can only view their own user data.
#     ZigWay staff can see any user info
#     """
#     def has_permission(self, request, view):
#         return request.user.is_staff or hasattr(request.user, 'agent')

#     def has_object_permission(self, request, view, obj):
#         return (obj == request.user) or request.user.is_staff
