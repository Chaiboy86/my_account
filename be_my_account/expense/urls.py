from rest_framework import routers
from .api import ExpenseViewSet, CategoryViewSet, ItemViewSet, PaymentMethodViewSet, ExpenseSummaryViewSet, ExpenseSummaryPersonalViewSet, ExpenseSummaryCommonViewSet, ExpenseItemSummaryViewSet, ExpenseCategorySummaryViewSet, ExpenseUtilitySummaryViewSet

router = routers.DefaultRouter()
router.register('api/expense', ExpenseViewSet, 'expense')
router.register('api/category', CategoryViewSet, 'category')
router.register('api/item', ItemViewSet, 'item')
router.register('api/paymentmethod', PaymentMethodViewSet, 'paymentmethod')
router.register('api/expensesummary', ExpenseSummaryViewSet, 'expensesummary')
router.register('api/expense/summary/personal', ExpenseSummaryPersonalViewSet, 'expense/summary/personal')
router.register('api/expense/summary/common', ExpenseSummaryCommonViewSet, 'expense/summary/common')
router.register('api/expense/item/summary', ExpenseItemSummaryViewSet, 'expense/item/summary')
router.register('api/expense/category/summary', ExpenseCategorySummaryViewSet, 'expense/category/summary')
router.register('api/expense/utility/summary', ExpenseUtilitySummaryViewSet, 'expense/utility/summary')

urlpatterns = router.urls