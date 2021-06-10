
<template>
  <div class="p-fluid">
    <div class="card">
      <h5>Row Editing</h5>
      <DataTable
        :value="products3"
        editMode="row"
        dataKey="id"
        v-model:editingRows="editingRows"
        @rowEditInit="onRowEditInit"
        @rowEditCancel="onRowEditCancel"
        responsiveLayout="scroll"
      >
        <Column field="code" header="Code" style="width: 20%">
          <template #editor="slotProps">
            <InputText
              v-model="slotProps.data[slotProps.column.props.field]"
              autofocus
            />
          </template>
        </Column>
        <Column field="name" header="Name" style="width: 20%">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column field="inventoryStatus" header="Status" style="width: 20%">
          <template #editor="slotProps">
            <Dropdown
              v-model="slotProps.data['inventoryStatus']"
              :options="statuses"
              optionLabel="label"
              optionValue="value"
              laceholder="Select a Status"
            >
              <template #option="slotProps">
                <span
                  :class="
                    'product-badge status-' +
                    slotProps.option.value.toLowerCase()
                  "
                  >{{ slotProps.option.label }}</span
                >
              </template>
            </Dropdown>
          </template>
          <template #body="slotProps">
            {{ getStatusLabel(slotProps.data.inventoryStatus) }}
          </template>
        </Column>
        <Column field="price" header="Price" style="width: 20%">
          <template #editor="slotProps">
            <InputText v-model="slotProps.data[slotProps.column.props.field]" />
          </template>
        </Column>
        <Column
          :rowEditor="true"
          style="width: 10%; min-width: 8rem"
          bodyStyle="text-align:center"
        ></Column>
      </DataTable>
    </div>
  </div>
</template>

<script>
import { ref, onMounted } from "vue";
import ProductService from "./service/ProductService";

export default {
  setup() {
    onMounted(() => {
      productService.value
        .getProductsSmall()
        .then((data) => (products3.value = data));
    });

    const productService = ref(new ProductService());
    const editingRows = ref([]);
    const columns = ref([
      { field: "code", header: "Code" },
      { field: "name", header: "Name" },
      { field: "quantity", header: "Quantity" },
      { field: "price", header: "Price" },
    ]);
    const products3 = ref(null);
    const originalRows = ref({});
    const statuses = ref([
      { label: "In Stock", value: "INSTOCK" },
      { label: "Low Stock", value: "LOWSTOCK" },
      { label: "Out of Stock", value: "OUTOFSTOCK" },
    ]);

    const isPositiveInteger = (val) => {
      let str = String(val);
      str = str.trim();
      if (!str) {
        return false;
      }
      str = str.replace(/^0+/, "") || "0";
      var n = Math.floor(Number(str));
      return n !== Infinity && String(n) === str && n >= 0;
    };
    const onRowEditInit = (event) => {
      originalRows.value[event.index] = { ...products3.value[event.index] };
    };
    const onRowEditCancel = (event) => {
      products3.value[event.index] = originalRows.value[event.index];
    };
    const getStatusLabel = (status) => {
      switch (status) {
        case "INSTOCK":
          return "In Stock";

        case "LOWSTOCK":
          return "Low Stock";

        case "OUTOFSTOCK":
          return "Out of Stock";

        default:
          return "NA";
      }
    };

    return {
      productService,
      editingRows,
      columns,
      products3,
      originalRows,
      statuses,
      isPositiveInteger,
      onRowEditInit,
      onRowEditCancel,
      getStatusLabel,
    };
  },
};
</script>

<style lang="scss" scoped>
::v-deep(.editable-cells-table td.p-cell-editing) {
  padding-top: 0;
  padding-bottom: 0;
}
</style>
