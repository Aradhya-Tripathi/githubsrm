import random
import string
from datetime import datetime
from typing import Any, Dict

import pymongo
from django.conf import settings
from dotenv import load_dotenv

load_dotenv()


class Entry:
    def __init__(self):
        client = pymongo.MongoClient(settings.DATABASE["mongo_uri"])
        self.db = client[settings.DATABASE["db"]]

    def get_uid(self) -> str:
        """Returns 8 character alpha numeric unique id

        Args:
            length (int)
            operator (pymongo.MongoClient)

        Returns:
            str
        """

        gen_id = random.choices(string.ascii_uppercase + string.digits, k=8)

        if self.db.collection.find_one({"_id": gen_id}):
            return self.get_uid(length=8)

        return "".join(gen_id)

    def _enter_project(
        self, doc: Dict[str, str], visibility: bool, project_id: str
    ) -> None:
        """Project Entry (only accessed by maintainer)

        Args:
            doc (Dict[str, str]): post to be entred
            project_id (str): project id
        """

        doc = {**doc, **{"_id": project_id}, **{"private": visibility}}
        self.db.project.insert_one(doc)

    def _update_project(self, identifier: str, project_id: str) -> None:
        """Update contributers of the project (only accessed by contributor)

        Args:
            identifier (str): Contributor ID
            project_id: (str): Project to add contributors to
        """
        project = self.db.project.find_one_and_update(
            {"_id": project_id},
            {"$push": {"contributor_id": identifier}},
            upsert=False,
        )
        if project:
            return True

    def enter_maintainer(self, doc: Dict[str, str]) -> Any:
        """Enter Maintainers

        Args:
            doc (Dict[str, str]): Maintainer Schema

        Returns:
            Any
        """
        project_url = doc.get("project_url")

        description = doc.pop("description")
        tags = doc.pop("tags")
        project_name = doc.pop("project_name")

        project_id = self.get_uid()
        _id = self.get_uid()
        doc = {
            **doc,
            **{"_id": _id},
            **{"project_id": project_id},
            **{"is_admin_approved": False},
        }
        try:
            existing_maintainer = self.db.maintainer.find_one(
                {"srm_email": doc.get("srm_email"), "reg_number": doc.get("reg_number")}
            )

            if existing_maintainer and "password" in existing_maintainer:
                self.db.maintainer.insert_one(
                    {**doc, **{"password": existing_maintainer.get("password")}}
                )

            else:
                self.db.maintainer.insert_one(doc)

            # Default approve to false
            self._enter_project(
                {
                    "project_url": project_url,
                    "description": description,
                    "tags": tags,
                    "is_admin_approved": False,
                    "project_name": project_name,
                    "project_url": project_url,
                },
                visibility=doc["private"],
                project_id=project_id,
            )

            return project_id, _id, project_name, description

        except Exception as e:
            print(e)
            return

    def enter_beta_maintainer(self, doc: Dict[str, Any]) -> str:
        """Add beta maintainers to project and updates maintainers
           collection.

        Args:
            doc (Dict): beta maintainer details

        Returns:
            str
        """
        try:
            _id = self.get_uid()

            existing_maintainer = self.db.maintainer.find_one(
                {"srm_email": doc.get("srm_email"), "reg_number": doc.get("reg_number")}
            )

            if existing_maintainer and "password" in existing_maintainer:
                self.db.maintainer.insert_one(
                    {
                        **doc,
                        **{"_id": _id},
                        **{"project_id": doc.get("project_id")},
                        **{"is_admin_approved": False},
                        **{"password": existing_maintainer.get("password")},
                    }
                )
                return _id

            else:
                self.db.maintainer.insert_one(
                    {
                        **doc,
                        **{"_id": _id},
                        **{"project_id": doc.get("project_id")},
                        **{"is_admin_approved": False},
                    }
                )
                return _id

        except Exception as e:
            print(e)
            return

    def enter_contributor(self, doc: Dict[str, Any]) -> Dict[str, str]:
        """Addition of contributors for avaliable Projects

        Args:
            doc (Dict[str, Any])
        """

        _id = self.get_uid()
        doc = {
            **doc,
            **{"_id": _id},
            **{"is_admin_approved": False},
            **{"is_maintainer_approved": False},
            **{"is_added_to_repo": False},
        }

        project_doc = self.db.project.find_one({"_id": doc.get("interested_project")})
        if not project_doc:
            return

        try:
            self.db.contributor.insert_one(doc)
            return {**doc, **project_doc}

        except Exception as e:
            print(e)
            return

    def beta_maintainer_reset_status(self, maintainer_id: str) -> None:
        """Delete beta maintainer

        Args:
            maintainer_id (str): maintainer id

        """
        self.db.maintainer.delete_one({"_id": maintainer_id})

    def alpha_maintainer_reset_status(
        self, project_id: str, maintainer_id: str
    ) -> None:
        """Delete alpha maintainer and added project

        Args:
            project_id (str)
            maintainer_id (str)
        """
        self.db.project.delete_one({"_id": project_id})

        self.db.maintainer.delete_one({"_id": maintainer_id})

    def delete_contributor(self, identifier: str) -> bool:
        """Delete Contributos

        Args:
            identifier (str): Contributor ID

        Returns:
            bool
        """
        try:
            self.db.project.delete_one({"contributor_id": identifier})

            self.db.contributor.delete_one({"_id": identifier})
            return True
        except Exception as e:
            return

    def get_projects(self, admin: bool = False) -> object:
        """Get all public projects / all project for admin

        Returns:
            object: MongoDB cursor
            admin (bool): admin access
        """
        if admin:
            self.db.project.find({})
        return self.db.project.find({"private": False, "is_admin_approved": True})

    def get_contributors(self) -> object:
        """Get all existing contributors

        Returns:
            [type]: MongoDB cursor
        """
        return self.db.contributor.find({})

    def get_maintainers(self) -> object:
        """Get all maintainers and status

        Returns:
            [type]: MongoDB cursor
        """
        return self.db.maintainer.find({})

    def get_team_data(self) -> object:
        """Get all team data

        Returns:
            [type]: MongoDB cursor
        """
        return self.db.team.find({})

    def enter_contact_us(self, doc: Dict[str, Any]) -> bool:
        """Enter Contact us details

        Args:
            data

        Returns:
            bool
        """

        details = self.db.contactUs.find_one({"message": doc.get("message")})

        if details:
            return
        try:
            self.db.contactUs.insert_one(doc)
            return True
        except Exception as e:
            return

    def get_contact_us(self) -> object:
        """Gets all contact us data for admin

        Returns:
            type: MongoDB cursor
        """
        return self.db.contactus.find({})

    def get_project_from_id(self, identifier: str) -> Dict[str, Any]:
        """Get project documents from project ids

        Args:
            identifier (str): project id

        Returns:
            Dict[str, Any]: project document
        """

        project = self.db.project.find_one({"_id": identifier})
        if project:
            return project

        return None
