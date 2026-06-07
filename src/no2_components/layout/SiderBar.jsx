// SiderBar.jsx

import React, { useState } from 'react'
import styled from 'styled-components'
import { Link, useLocation } from 'react-router-dom'
import { MdExpandMore, MdExpandLess } from 'react-icons/md'

const SiderBar = () => {

    const [open, setOpen] = useState(false)
    const [saleOpen, setSaleOpen] = useState(false)
    const location = useLocation()

  return (
    <>

        {/* 모바일 상단 바 */}
        <MobileTopBar>

            <MenuButton
                onClick={() => setOpen(!open)}
            >
                ☰
            </MenuButton>

            <MobileLogo>
                MySystem
            </MobileLogo>

        </MobileTopBar>

        {/* 사이드바 */}
        <Container $open={open}>

            <Menu>

                <MenuItem
                    to="/"
                    $active={location.pathname === "/"}
                    onClick={() => setOpen(false)}
                >
                    Home
                </MenuItem>

                <MenuItem
                    to="/todo"
                    $active={location.pathname === "/todo"}
                    onClick={() => setOpen(false)}
                >
                    할일
                </MenuItem>

                <MenuItem
                    to="/employee"
                    $active={location.pathname === "/employee"}
                    onClick={() => setOpen(false)}
                >
                    고용인 정보
                </MenuItem>
                <MenuWrapper>
                    <MenuItemButton
                        $active={saleOpen}
                        onClick ={() => setSaleOpen(prev=> !prev)}
                    >

                        <span>판매 관리</span>
                        {saleOpen ? <MdExpandLess/> : <MdExpandMore/>}
                    </MenuItemButton>
                    {saleOpen && (
                        <SubMenu>
                            <MenuItem
                                to="/product"
                                $active={location.pathname === "/product"}
                                onClick={() => setOpen(false)}
                                >
                                상품 정보
                            </MenuItem>
                            <MenuItem
                                to="/sales"
                                $active={location.pathname === "/sales"}
                                onClick={() => setOpen(false)}
                                >
                                판매 정보
                            </MenuItem>
                    </SubMenu>
                    )}
                </MenuWrapper>
                

            </Menu>

        </Container>

    </>
  )
}

export default SiderBar

const MenuWrapper = styled.div``;

const MenuItemButton = styled.div`
    width: 100%;
    cursor: pointer;

    display: flex;
    justify-content: space-between;
    align-items: center;

    padding: 13px 16px;
    border-radius: 12px;

    font-size: 15px;
    font-weight: 500;

    background: ${({ $active }) =>
        $active ? "#2563eb" : "transparent"};

    color: ${({ $active }) =>
        $active ? "#fff" : "#94a3b8"};

    transition: all 0.25s ease;

    &:hover {
        background: ${({ $active }) =>
            $active ? "#2563eb" : "#1e293b"};
        color: white;
        transform: translateX(4px);
    }

    svg {
        font-size: 20px;
    }
`;

const SubMenu = styled.div`
    display: flex;
    flex-direction: column;

    margin-top: 8px;
    margin-left: 14px;
    padding-left: 12px;

    border-left: 2px solid #334155;
    gap: 6px;
`;

const MobileTopBar = styled.div`
    display: none;

    @media (max-width: 768px) {
        width: 100%;
        height: 60px;

        background: #0f172a;
        box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);

        display: flex;
        justify-content: space-between;
        align-items: center;

        padding: 0 16px;

        position: fixed;
        top: 0;
        left: 0;

        z-index: 1000;
    }
`;

const MenuButton = styled.button`
    border: none;
    background: transparent;

    color: white;

    font-size: 28px;
    cursor: pointer;
`;

const MobileLogo = styled.div`
    color: white;

    font-size: 20px;
    font-weight: bold;
`;

const Container = styled.aside`
    width: 250px;
    min-height: 100vh;

    background: #0f172a;
    border-right: 1px solid #1e293b;

    padding: 24px 16px;

    transition: 0.3s;

    @media (max-width: 768px) {
        position: fixed;

        top: 60px;
        left: ${({ $open }) => ($open ? "0" : "-100%")};

        width: 250px;
        height: calc(100vh - 60px);

        overflow-y: auto;

        z-index: 999;
    }
`;

const Menu = styled.nav`
    display: flex;
    flex-direction: column;

    gap: 10px;
`;

const MenuItem = styled(Link)`
    display: flex;
    align-items: center;
    gap: 10px;

    text-decoration: none;

    padding: 13px 16px;

    border-radius: 12px;

    color: ${({ $active }) =>
        $active ? "#fff" : "#94a3b8"};

    background: ${({ $active }) =>
        $active ? "#2563eb" : "transparent"};

    font-size: 15px;
    font-weight: 500;

    transition: all 0.25s ease;

    &:hover {
        background: ${({ $active }) =>
            $active ? "#2563eb" : "#1e293b"};

        color: white;
        transform: translateX(4px);
    }
`;
