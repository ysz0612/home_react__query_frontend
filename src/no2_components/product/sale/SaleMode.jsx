import React, { useEffect } from "react";
import { Modal, Form, Input, InputNumber } from "antd";

const SaleMode = ({
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
      ...initialValues,
      ...values,
    });
  };

  return (
    <Modal
      title={initialValues ? "판매 수정" : "판매 등록"}
      open={open}
      onOk={() => form.submit()}
      onCancel={() => setOpen(false)}
      okText={initialValues ? "수정" : "등록"}
      cancelText="취소"
      destroyOnHidden
    >
      <Form
        form={form}
        layout="vertical"
        onFinish={handleFinish}
      >
        <Form.Item
          label="회원번호"
          name="user_id"
          rules={[
            {
              required: true,
              message: "회원번호를 입력하세요.",
            },
          ]}
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="상품번호"
          name="product_id"
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="수량"
          name="quantity"
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="할인율"
          name="discount_rate"
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="총금액"
          name="total_price"
        >
          <InputNumber style={{ width: "100%" }} />
        </Form.Item>

        <Form.Item
          label="판매일"
          name="created_at"
        >
          <Input placeholder="YYYY-MM-DD" />
        </Form.Item>
      </Form>
    </Modal>
  );
};

export default SaleMode;
