import React, { useState } from "react";
import styled from "styled-components";

import {
  useAllGetProduct,
  usePostRegisterProduct,
  usePutUpdateProduct,
  useDeleteProduct,
} from "../../no3_store/hooks/useProduct";

import ProductMode from "./ProductMode";

const ProductTable = () => {
  const [open, setOpen] = useState(false);

  const { data: products = [] } = useAllGetProduct();

  const postMutation = usePostRegisterProduct();
  const putMutation = usePutUpdateProduct();
  const deleteMutation = useDeleteProduct();

  const [form, setForm] = useState({
    id: "",
    product_name: "",
    color: "",
    cost_price: "",
    sale_price: "",
    category_code: "",
  });

  const handleSubmit = (values) => {
    if (values.id) {
      putMutation.mutate({
        ...values,
        cost_price: Number(values.cost_price),
        sale_price: Number(values.sale_price),
      });
    } else {
      postMutation.mutate({
        product_name: values.product_name,
        color: values.color,
        cost_price: Number(values.cost_price),
        sale_price: Number(values.sale_price),
        category_code: values.category_code,
      });
    }

    setOpen(false);

    setForm({
      id: "",
      product_name: "",
      color: "",
      cost_price: "",
      sale_price: "",
      category_code: "",
    });
  };

  return (
    <Container>
      <Title>상품 관리</Title>

      <ButtonBox>
        <ActionButton
          onClick={() => {
            setForm({
              id: "",
              product_name: "",
              color: "",
              cost_price: "",
              sale_price: "",
              category_code: "",
            });
            setOpen(true);
          }}
        >
          등록
        </ActionButton>
      </ButtonBox>

      <Table>
        <thead>
          <tr>
            <th>상품명</th>
            <th>색상</th>
            <th>원가</th>
            <th>판매가</th>
            <th>카테고리</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {products.map((item) => (
            <tr key={item.id}>
              <td>{item.product_name}</td>
              <td>{item.color ?? "-"}</td>
              <td>{(item.cost_price ?? 0).toLocaleString()}원</td>
              <td>{(item.sale_price ?? 0).toLocaleString()}원</td>
              <td>{item.category_code ?? "-"}</td>

              <td>
                <SmallButton
                  onClick={() => {
                    setForm({
                      id: item.id,
                      product_name: item.product_name,
                      color: item.color,
                      cost_price: item.cost_price,
                      sale_price: item.sale_price,
                      category_code: item.category_code,
                    });

                    setOpen(true);
                  }}
                >
                  수정
                </SmallButton>

                <DeleteButton
                  onClick={() => {
                    if (window.confirm("삭제하시겠습니까?")) {
                      deleteMutation.mutate(item.id);
                    }
                  }}
                >
                  삭제
              </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <ProductMode
        open={open}
        setOpen={setOpen}
        initialValues={form}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default ProductTable;

const Container = styled.div`
  background: white;
  padding: 30px;
  border-radius: 12px;
  box-shadow: 0 3px 10px rgba(0, 0, 0, 0.08);
`;

const Title = styled.h2`
  margin-bottom: 24px;
  color: #1e293b;
`;

const ButtonBox = styled.div`
  display: flex;
  gap: 10px;
  margin-bottom: 24px;
`;

const ActionButton = styled.button`
  padding: 10px 18px;
  border: none;
  border-radius: 8px;
  background: #3b82f6;
  color: white;
  font-weight: bold;
  cursor: pointer;

  &:hover {
    background: #2563eb;
  }
`;

const Table = styled.table`
  width: 100%;
  border-collapse: collapse;

  th {
    background: #3b82f6;
    color: white;
    padding: 12px;
  }

  td {
    padding: 12px;
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
  }

  tr:hover {
    background: #f8fafc;
  }
`;

const SmallButton = styled.button`
  padding: 6px 12px;
  margin-right: 6px;
  border: none;
  border-radius: 6px;
  background: #64748b;
  color: white;
  cursor: pointer;

  &:hover {
    background: #475569;
  }
`;

const DeleteButton = styled.button`
  padding: 6px 12px;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: white;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;
