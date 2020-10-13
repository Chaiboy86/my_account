from django.db import models
from django.contrib.auth.models import User

# Create your models here.
class Category(models.Model):
    name = models.CharField(max_length=100)
    sort_order = models.IntegerField(blank=True)

class Item(models.Model):
    name = models.CharField(max_length=100)
    sort_order = models.IntegerField(blank=True)
    category = models.ForeignKey(Category, related_name="item", on_delete=models.CASCADE, null=True)

class PaymentMethod(models.Model):
    name = models.CharField(max_length=100)
    sort_order = models.IntegerField(blank=True)

class Expense(models.Model):
    account_sv = models.IntegerField()
    place = models.CharField(max_length=100, blank=True)
    date = models.DateField()
    value = models.IntegerField()
    note = models.CharField(max_length=100, blank=True)
    owner = models.ForeignKey(User, related_name="expense", on_delete=models.CASCADE, null=True)
    category = models.ForeignKey(Category, related_name="expense", on_delete=models.CASCADE, null=True)
    item = models.ForeignKey(Item, related_name="expense", on_delete=models.CASCADE, null=True)
    paymentmethod = models.ForeignKey(PaymentMethod, related_name="expense", on_delete=models.CASCADE, null=True)
