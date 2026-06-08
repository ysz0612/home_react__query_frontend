import { useState } from "react";
import styled from "styled-components";

import {
  useAllGetSale,
  usePostRegisterSale,
  usePutUpdateSale,
  useDeleteSale,
} from "../../../no3_store/hooks/useSale";

import SaleMode from "./SaleMode";

const SaleTable = () => {
  const [open, setOpen] = useState(false);

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

  const handleSubmit = (values) => {
    if (values.id) {
      putMutation.mutate({
        ...values,
        user_id: Number(values.user_id),
        product_id: Number(values.product_id),
        quantity: Number(values.quantity),
        discount_rate: Number(values.discount_rate),
        total_price: Number(values.total_price),
      });
    } else {
      postMutation.mutate({
        user_id: Number(values.user_id),
        product_id: Number(values.product_id),
        quantity: Number(values.quantity),
        discount_rate: Number(values.discount_rate),
        total_price: Number(values.total_price),
        created_at: values.created_at,
      });
    }

    setOpen(false);

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

  return (
    <Container>
      <Title>판매 관리</Title>

      <ButtonBox>
        <ActionButton
          onClick={() => {
            setForm({
              id: "",
              user_id: "",
              product_id: "",
              quantity: "",
              discount_rate: "",
              total_price: "",
              created_at: "",
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
              <td>{item.user_id}</td>
              <td>{item.product_id}</td>
              <td>{item.quantity}</td>
              <td>{item.discount_rate}</td>
              <td>{(item.total_price ?? 0).toLocaleString()}원</td>
              <td>{item.created_at}</td>

              <td>
                <SmallButton
                  onClick={() => {
                    setForm(item);
                    setOpen(true);
                  }}
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

      <SaleMode
        open={open}
        setOpen={setOpen}
        initialValues={form}
        onSubmit={handleSubmit}
      />
    </Container>
  );
};

export default SaleTable;


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

  &:hover {
    background: #475569;
  }
`;

const DeleteButton = styled.button`
  padding: 6px 10px;
  border: none;
  border-radius: 6px;
  background: #ef4444;
  color: white;
  cursor: pointer;

  &:hover {
    background: #dc2626;
  }
`;
