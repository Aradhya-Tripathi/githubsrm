from rest_framework.permissions import BasePermission

from administrator import entry
from .utils import get_token


class AuthAdminPerms(BasePermission):
    def has_permission(self, request, view) -> bool:
        """Define register permissions.

        Args:
            request ([type])
            view ([type])

        Returns:
            bool
        """

        try:
            if value := get_token(request_header=request.headers):
                token_type, token = value

                assert token_type == "Bearer"
                return entry.check_webHook(token)
            return False
        except Exception as e:
            print(e)
            return False
