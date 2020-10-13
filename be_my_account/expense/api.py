from rest_framework import viewsets, permissions, generics
from rest_framework.response import Response
from rest_framework.decorators import action
from .models import Item, Category, PaymentMethod, Expense
from django.db.models import Sum, Avg, Count
from itertools import chain
from .serializer import ItemSerializer, CategorySerializer, ExpenseSerializer, PaymentMethodSerializer
from src.constants import *

# Item Viewset
class ItemViewSet(viewsets.ModelViewSet):
    queryset = Item.objects.all()
    serializer_class = ItemSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
# Category Viewset
class CategoryViewSet(viewsets.ModelViewSet):
    queryset = Category.objects.all()
    serializer_class = CategorySerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
# PaymentMethod Viewset
class PaymentMethodViewSet(viewsets.ModelViewSet):
    queryset = PaymentMethod.objects.all()
    serializer_class = PaymentMethodSerializer
    permission_classes = [
        permissions.AllowAny
    ]
    
# Expense Viewset
class ExpenseViewSet(viewsets.ModelViewSet):
    serializer_class = ExpenseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]    

    def get_queryset(self):
        queryset = Expense.objects.all()
        date = self.request.query_params.get('date', None)                
        if date is not None:
            queryset = queryset.filter(date__contains=date)
        return queryset

    def perform_create(self, serializer):
        serializer.save(owner=self.request.user)

# JSONにカスタムフィールドを追加する方法は以下を参考
# https://stackoverflow.com/questions/48914297/how-can-i-add-additional-top-level-json-fields-using-the-modelserializer/48914719
    # def list(self, request):
    #     date = self.request.query_params.get('date', None)
    #     queryset = self.get_queryset()
    #     serializer = self.get_serializer(queryset, many=True)
    #     sum_ammount_month = self.request.user.expense.filter(date__contains=date).aggregate(sum_ammount_month=Sum('value'))
    #     if sum_ammount_month["sum_ammount_month"] is None:
    #         sum_ammount_month["sum_ammount_month"] = 0
    #     response_data = {"summary":sum_ammount_month,"expense":serializer.data}    
    #     return Response(response_data)


class ExpenseSummaryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    # TODO：なぜretrieve()ではなく、list()が望ましいかを確認する
    def list(self, request):
        date = self.request.query_params.get('date')
        # TODO：以下がなぜ不要かを確認する
        # queryset = self.get_queryset()
        # serializer = self.get_serializer(queryset, many=True)
        sum_ammount_month = self.request.user.expense.filter(date__contains=date).aggregate(sum_ammount_month=Sum('value'))
        if sum_ammount_month["sum_ammount_month"] is None:
            sum_ammount_month["sum_ammount_month"] = 0
        response_data = {"summary":sum_ammount_month}    
        return Response(response_data)

class ExpenseSummaryCommonViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    # TODO：なぜretrieve()ではなく、list()が望ましいかを確認する
    def list(self, request):
        date = self.request.query_params.get('date')
        # TODO：以下がなぜ不要かを確認する
        # queryset = self.get_queryset()
        # serializer = self.get_serializer(queryset, many=True)
        sum_ammount_month = self.request.user.expense.filter(date__contains=date, account_sv=ACC_COMMON).aggregate(sum_ammount_month=Sum('value'))
        if sum_ammount_month["sum_ammount_month"] is None:
            sum_ammount_month["sum_ammount_month"] = 0
        response_data = {"summaryCommon":sum_ammount_month}    
        return Response(response_data)

class ExpenseSummaryPersonalViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        date = self.request.query_params.get('date')
        sum_ammount_month = self.request.user.expense.filter(date__contains=date, account_sv=ACC_PERSONAL).aggregate(sum_ammount_month=Sum('value'))
        if sum_ammount_month["sum_ammount_month"] is None:
            sum_ammount_month["sum_ammount_month"] = 0
        response_data = {"summaryPersonal":sum_ammount_month}    
        return Response(response_data)


class ExpenseItemSummaryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        response_data = []

        date = self.request.query_params.get('date')
        # 該当する年月のアイテムIDを取得する
        item_id_list = self.request.user.expense.filter(date__contains=date).values_list('item__id', flat=True)
        # QuerySet型をlist型に変換
        item_id_list = list(item_id_list)

        # item_id_list配列に同じアイテムIDが含まれている場合は配列から削除する
        for item_id in item_id_list:
            if item_id_list.count(item_id) > 1:
                item_id_list.remove(item_id) 

        # response_data配列に各アイテムの集計情報をJSON形式で追加する
        for item_id in item_id_list:
            item = {}
            # values()で指定のカラムのみを選択する。get()で値のみを取得する　※複数の値の取得を想定していないため、get()を使用
            item_name = Item.objects.filter(id__exact=item_id).values_list('name', flat=True).get()
            # get(カラム名)でdict型の値のみを取得する
            item_value = self.request.user.expense.filter(date__contains=date, item__id__exact=item_id).aggregate(sum_value=Sum('value')).get('sum_value')

            item["id"] = item_id
            item["name"] = item_name
            item["value"] = item_value
            response_data.append(item)
        return Response(response_data)

class ExpenseCategorySummaryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        response_data = []

        date = self.request.query_params.get('date')
        # 該当する年月のアイテムIDを取得する
        category_id_list = self.request.user.expense.filter(date__contains=date).values_list('category__id', flat=True)
        # QuerySet型をlist型に変換
        category_id_list = list(category_id_list)

        # item_id_list配列に同じアイテムIDが含まれている場合は配列から削除する
        for category_id in category_id_list:
            if category_id_list.count(category_id) > 1:
                category_id_list.remove(category_id) 

        # response_data配列に各アイテムの集計情報をJSON形式で追加する
        for category_id in category_id_list:
            category = {}
            # values()で指定のカラムのみを選択する。get()で値のみを取得する　※複数の値の取得を想定していないため、get()を使用
            category_name = Category.objects.filter(id__exact=category_id).values_list('name', flat=True).get()
            # get(カラム名)でdict型の値のみを取得する
            category_value = self.request.user.expense.filter(date__contains=date, category__id__exact=category_id).aggregate(sum_value=Sum('value')).get('sum_value')

            category["id"] = category_id
            category["name"] = category_name
            category["value"] = category_value
            response_data.append(category)
        return Response(response_data)

class ExpenseUtilitySummaryViewSet(viewsets.ReadOnlyModelViewSet):
    queryset = Expense.objects.all()
    serializer_class = ExpenseSerializer
    permission_classes = [
        permissions.IsAuthenticated
    ]

    def list(self, request):
        response_data = []

        # endDate = self.request.query_params.get('date')
        # startDate = endDate
        # start_date = datetime.date(2019,1,1)
        # end_date = datetime.date(2020,11,30)

        water_name = Item.objects.filter(id__exact=32).values_list('name', flat=True).get()
        electric_name = Item.objects.filter(id__exact=32).values_list('name', flat=True).get()
        gas_name = Item.objects.filter(id__exact=32).values_list('name', flat=True).get()
        
        date_list = ["2019-09","2019-10","2019-11","2019-12","2020-01","2020-02","2020-03","2020-04","2020-05","2020-06","2020-07","2020-08","2020-09","2020-10","2020-11"]
        for date in date_list:
            utility={}
            water_value = self.request.user.expense.filter(date__contains=date, item__id__exact=32).values_list('value', flat=True)
            electric_value = self.request.user.expense.filter(date__contains=date, item__id__exact=33).values_list('value', flat=True)
            gas_value = self.request.user.expense.filter(date__contains=date, item__id__exact=34).values_list('value', flat=True)
            # print(water_value[0])
            utility["date"] = date
            utility["water_name"] = water_name
            utility["water"] = water_value
            utility["electric_name"] = electric_name
            utility["electric"] = electric_value
            utility["gas_name"] = gas_name
            utility["gas"] = gas_value            
            response_data.append(utility)
        return Response(response_data)