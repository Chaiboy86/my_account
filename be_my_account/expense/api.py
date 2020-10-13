from rest_framework import viewsets, permissions
from .models import Item, Category, PaymentMethod
from .serializer import ItemSerializer, CategorySerializer, ExpenseSerializer, PaymentMethodSerializer

# Item Viewset
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()

    permission_classes = [
        permissions.AllowAny
    ]
    
    serializer_class = ItemSerializer

# Category Viewset
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()

    permission_classes = [
        permissions.AllowAny
    ]
    
    serializer_class = CategorySerializer

# PaymentMethod Viewset
class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()

    permission_classes = [
        permissions.AllowAny
    ]
    
    serializer_class = PaymentMethodSerializer

# Expense Viewset
class ExpenseViewSet(viewsets.ModelViewSet):
    permission_classes = [
        permissions.IsAuthenticated
    ]
    
    serializer_class = ExpenseSerializer

    def get_queryset(self):
        return self.request.user.expense.all()

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)