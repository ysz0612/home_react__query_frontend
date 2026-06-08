import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber, Select } from "antd";

const ProductMode = ({
  open,
  setOpen,
  initialValues,
  onSubmit,
}) => {
  const [form] = Form.useForm();

  useEffect(() => {
    if (open) {
      form.setFieldsValue(initialValues);
    } else {
      form.resetFields();
    }
  }, [open, initialValues, form]);

  const handleFinish = (values) => {
    onSubmit({
      ...(initialValues || {}),
      ...values,
    });
  };

  return (
    <Modal
      title={initialValues?.id ? "상품 수정" : "상품 등록"}
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen(false)}
      okText={initialValues?.id ? "수정" : "등록"}
      cancelText="취소"
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
        onKeyDown={(e) => {
          if (e.key === "Enter") {
            e.preventDefault();
            form.submit();
          }
        }}
      >
        <Form.Item
          label="상품명"
          name="product_name"
          rules={[
            {
              required: true,
              message: "상품명을 입력하세요.",
            },
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="색상"
          name="color"
          rules={[
            {
              required: true,
              message: "색상을 선택하세요.",
            },
          ]}
        >
          <Select
            options={[
              { value: "Pink", label: "Pink" },
              { value: "Red", label: "Red" },
              { value: "Blue", label: "Blue" },
              { value: "Black", label: "Black" },
              { value: "Purple", label: "Purple" },
              { value: "White", label: "White" },
            ]}
          />
        </Form.Item>

        <Form.Item
          label="원가"
          name="cost_price"
        >
          <InputNumber
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="판매가"
          name="sale_price"
        >
          <InputNumber
            style={{ width: "100%" }}
          />
        </Form.Item>

        <Form.Item
          label="카테고리"
          name="category_code"
          rules={[
            {
              required: true,
              message: "카테고리를 선택하세요.",
            },
          ]}
        >
          <Select
            options={[
              { value: "E1", label: "E1" },
              { value: "E2", label: "E2" },
              { value: "E3", label: "E3" },
              { value: "A1", label: "A1" },
              { value: "A2", label: "A2" },
            ]}
          />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default ProductMode;
