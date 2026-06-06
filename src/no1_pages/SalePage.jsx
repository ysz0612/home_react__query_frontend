import { useState } from "react";
import styled from "styled-components";

import {
  useAllGetSale,
  usePostRegisterSale,
  usePutUpdateSale,
  useDeleteSale,
} from "../no3_store/hooks/useSale";

const SalePage = () => {
  const { data: sales = [] } = useAllGetSale();

  const postMutation = usePostRegisterSale();
  const putMutation = usePutUpdateSale();
  const deleteMutation = useDeleteSale();

  const [form, setForm] = useState({
    id: "",
    user_id: "",
    product_id: "",
    quantity: "",
    discount_rate: "",
    total_price: "",
    created_at: "",
  });

  const changeHandler = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const resetForm = () => {
    setForm({
      id: "",
      user_id: "",
      product_id: "",
      quantity: "",
      discount_rate: "",
      total_price: "",
      created_at: "",
    });
  };

  const registerHandler = () => {
    postMutation.mutate({
      user_id: Number(form.user_id),
      product_id: Number(form.product_id),
      quantity: Number(form.quantity),
      discount_rate: Number(form.discount_rate),
      total_price: Number(form.total_price),
      created_at: form.created_at,
    });

    resetForm();
  };

  const updateHandler = () => {
    putMutation.mutate({
      ...form,
      user_id: Number(form.user_id),
      product_id: Number(form.product_id),
      quantity: Number(form.quantity),
      discount_rate: Number(form.discount_rate),
      total_price: Number(form.total_price),
    });

    resetForm();
  };

  return (
    <Container>
      <Title>판매 관리</Title>

      <InputGroup>
        <Input
          name="user_id"
          placeholder="회원번호"
          value={form.user_id}
          onChange={changeHandler}
        />

        <Input
          name="product_id"
          placeholder="상품번호"
          value={form.product_id}
          onChange={changeHandler}
        />

        <Input
          name="quantity"
          placeholder="수량"
          value={form.quantity}
          onChange={changeHandler}
        />

        <Input
          name="discount_rate"
          placeholder="할인율"
          value={form.discount_rate}
          onChange={changeHandler}
        />

        <Input
          name="total_price"
          placeholder="총금액"
          value={form.total_price}
          onChange={changeHandler}
        />

        <Input
          name="created_at"
          placeholder="YYYY-MM-DD"
          value={form.created_at}
          onChange={changeHandler}
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
            <th>ID</th>
            <th>회원</th>
            <th>상품</th>
            <th>수량</th>
            <th>할인율</th>
            <th>총금액</th>
            <th>판매일</th>
            <th>관리</th>
          </tr>
        </thead>

        <tbody>
          {sales.map((item) => (
            <tr key={item.id}>
              <td>{item.id}</td>
              <td>{item.user_id}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.discount_rate}</td>
              <td>{item.total_price.toLocaleString()}원</td>
              <td>{item.created_at}</td>

              <td>
                <SmallButton
                  onClick={() =>
                    setForm({
                      id: item.id,
                      user_id: item.user_id,
                      product_id: item.product_id,
                      quantity: item.quantity,
                      discount_rate: item.discount_rate,
                      total_price: item.total_price,
                      created_at: item.created_at,
                    })
                  }
                >
                  수정
                </SmallButton>

                <DeleteButton
                  onClick={() =>
                    deleteMutation.mutate(item.id)
                  }
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

export default SalePage;

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
  grid-template-columns: repeat(auto-fit, minmax(160px, 1fr));
  gap: 12px;
  margin-bottom: 20px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #cbd5e1;
  border-radius: 8px;
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
  cursor: pointer;
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
    padding: 10px;
    text-align: center;
    border-bottom: 1px solid #e2e8f0;
  }

  tr:hover {
    background: #f8fafc;
  }
`;

const SmallButton = styled.button`
  padding: 6px 10px;
  margin-right: 5px;
  border: none;
  border-radius: 6px;
  background: #64748b;
  color: white;
  cursor: pointer;
`;

const DeleteButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: white;
  cursor: pointer;
`;