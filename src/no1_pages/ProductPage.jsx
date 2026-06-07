import { useState } from "react";
import styled from "styled-components";

import {
  useAllGetProduct,
  usePostRegisterProduct,
  usePutUpdateProduct,
  useDeleteProduct,
} from "../no3_store/hooks/useProduct";

const ProductPage = () => {
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

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

// changeHandler 아래에 추가

const handleKeyDown = (e) => {
  if (e.key === "Enter") {
    if (form.id) {
      // 수정 모드
      updateHandler();
    } else {
      // 등록 모드
      registerHandler();
    }
  }
};


  const resetForm = () => {
    setForm({
      id: "",
      product_name: "",
      color: "",
      cost_price: "",
      sale_price: "",
      category_code: "",
    });
  };

  const registerHandler = () => {
    postMutation.mutate({
      product_name: form.product_name,
      color: form.color,
      cost_price: Number(form.cost_price),
      sale_price: Number(form.sale_price),
      category_code: form.category_code,
    });

    resetForm();
  };

  const updateHandler = () => {
    putMutation.mutate({
      ...form,
      cost_price: Number(form.cost_price),
      sale_price: Number(form.sale_price),
    });

    resetForm();
  };

  return (
    <Container>
      <Title>상품 관리</Title>

        <InputGroup>
          <Input
            name="product_name"
            placeholder="상품명"
            value={form.product_name ?? ""}
            onChange={changeHandler}
            onKeyDown={handleKeyDown}
          />

          <Input
            name="color"
            placeholder="색상"
            value={form.color ?? ""}
            onChange={changeHandler}
            onKeyDown={handleKeyDown}
          />

          <Input
            name="cost_price"
            placeholder="원가"
            value={form.cost_price ?? ""}
            onChange={changeHandler}
            onKeyDown={handleKeyDown}
          />

          <Input
            name="sale_price"
            placeholder="판매가"
            value={form.sale_price ?? ""}
            onChange={changeHandler}
            onKeyDown={handleKeyDown}
          />

          <Input
            name="category_code"
            placeholder="카테고리"
            value={form.category_code ?? ""}
            onChange={changeHandler}
            onKeyDown={handleKeyDown}
          />
        </InputGroup>

      <ButtonBox>
        <ActionButton onClick={registerHandler}>
          등록
        </ActionButton>

        <ActionButton onClick={updateHandler}>
          수정
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
                  onClick={() =>
                    setForm({
                      id: item.id ?? "",
                      product_name: item.product_name ?? "",
                      color: item.color ?? "",
                      cost_price: item.cost_price ?? "",
                      sale_price: item.sale_price ?? "",
                      category_code: item.category_code ?? "",
                    })
                  }
                >
                  수정
                </SmallButton>

                <DeleteButton
                  onClick={() => deleteMutation.mutate(item.id)}
                >
                  삭제
                </DeleteButton>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>
    </Container>
  );
};

export default ProductPage;

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

const InputGroup = styled.div`
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(180px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
  outline: none;
  font-size: 14px;

  &:focus {
    border-color: #3b82f6;
  }
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
