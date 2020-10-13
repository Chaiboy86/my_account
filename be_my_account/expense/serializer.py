from rest_framework import serializers
from expense.models import Item, Category, PaymentMethod, Expense

# ItemSerializer
class ItemSerializer(serializers.ModelSerializer):
    class Meta:
        model = Item
        fields = '__all__'

# CategorySerializer
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = '__all__'

# PaymentMethodSerializer
class PaymentMethodSerializer(serializers.ModelSerializer):
    class Meta:
        model = PaymentMethod
        fields = '__all__'

# ExpenseSerializer
class ExpenseSerializer(serializers.ModelSerializer):
    #GET時とPOST時によってフィールドが動的に変更できるように、以下URLを参考に実装
    #https://sakataharumi.hatenablog.jp/entry/2018/10/20/010806
    
    #GET時にcategoryモデルの全部フィールドを取得する
    category = CategorySerializer(read_only=True)
    #POST時に外部キーの登録ができるようにする
    category_id = serializers.PrimaryKeyRelatedField(queryset=Category.objects.all(), write_only=True)

    #GET時にitemモデルの全部フィールドを取得する
    item = ItemSerializer(read_only=True)
    #POST時に外部キーの登録ができるようにする       
    item_id = serializers.PrimaryKeyRelatedField(queryset=Item.objects.all(), write_only=True)

    #GET時にpaymentmethodモデルの全部フィールドを取得する
    paymentmethod = ItemSerializer(read_only=True)
    #POST時に外部キーの登録ができるようにする       
    paymentmethod_id = serializers.PrimaryKeyRelatedField(queryset=PaymentMethod.objects.all(), write_only=True)

    class Meta:
        model = Expense
        fields = ['id', 'account_sv', 'place', 'date','value','note','owner_id', 'category_id', 'category', 'item_id', 'item', 'paymentmethod_id', 'paymentmethod']

    def create(self, validated_data):
        # TODO:処理を効率化する
        validated_data['category'] = validated_data.get('category_id', None)
        validated_data['item'] = validated_data.get('item_id', None)
        validated_data['paymentmethod'] = validated_data.get('paymentmethod_id', None)

        if validated_data['category'] is None:
            raise serializers.ValidationError("category_id not found.") 

        del validated_data['category_id']

        if validated_data['item'] is None:
            raise serializers.ValidationError("item_id not found.") 

        del validated_data['item_id']

        if validated_data['paymentmethod'] is None:
            raise serializers.ValidationError("paymentmethod_id not found.") 

        del validated_data['paymentmethod_id']

        return Expense.objects.create(**validated_data)