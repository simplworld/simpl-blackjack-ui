from django.db import models
from cuser.models import AbstractCUser


class User(AbstractCUser):
    simpl_id = models.PositiveIntegerField()
