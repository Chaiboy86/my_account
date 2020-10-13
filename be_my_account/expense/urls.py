from rest_framework import routers
from .api import ExpenseViewSet, CategoryViewSet, ItemViewSet, PaymentMethodViewSet

router = routers.DefaultRouter()
router.register('api/expense', ExpenseViewSet, 'expense')
router.register('api/category', CategoryViewSet, 'category')
router.register('api/item', ItemViewSet, 'item')
router.register('api/paymentmethod', PaymentMethodViewSet, 'paymentmethod')

urlpatterns = router.urls