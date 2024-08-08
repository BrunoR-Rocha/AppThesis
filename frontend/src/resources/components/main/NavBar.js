import React, { useEffect, useState } from "react";
import styled from "styled-components";

import AddIcon from "@mui/icons-material/Add";
import ExpandLessIcon from "@mui/icons-material/ExpandLess";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import RemoveIcon from "@mui/icons-material/Remove";
import { useMediaQuery } from "@mui/material";
import { Link, useNavigate } from "react-router-dom";
import Wrapper from "./Wrapper";
// import { HashLink } from "react-router-hash-link";

const NavigationBar = styled("div")`
  width: 100%;
  height: 80px;
  background-color: #ffffff03;
  backdrop-filter: blur(5px);
  box-shadow: 0px 8px 20px rgba(0, 0, 0, 0.1);
  position: fixed;
  top: 0;
  left: 0;
  z-index: 1000;
  transition: background-color 0.3s ease-in-out;

  & a,
  p {
    font-family: "Prompt", sans-serif;
  }
  &.scrolled {
    background-color: #172726;
  }
  & .nav-links {
    display: none;
  }
  @media (min-width: 1024px) {
    & .nav-links {
      display: flex;
    }
  }

  & .mobilenavigation {
    &::-webkit-scrollbar {
      display: none;
    }
  }
`;
const SecondaryNavigation = styled("div")`
  display: flex;
  position: absolute;
  top: 80px;
  background-color: #172726;
  min-height: 250px;
  width: 100%;
  overflow: hidden;

  & .secondaryColor {
    background-color: #1c6c5e;
    position: absolute;
    right: 0;
    width: 50%;
    height: 100%;
  }
`;
function NavBar() {
  const desktop = useMediaQuery("(min-width:1024px)");
  const [scrolled, setScrolled] = useState();
  const [open, setOpen] = useState(false);
  const [production, setProduction] = useState(false);
  const [producers, setProducers] = useState(false);
  const [quality, setQuality] = useState(false);

  const navigate = useNavigate();

  useEffect(() => {
    if (window.location.pathname !== "/") {
      setScrolled(true);
    } else if (window.location.pathname === "/") {
      window.addEventListener("scroll", () => {
        if (window.scrollY > 100) {
          setScrolled(true);
        } else {
          setScrolled(false);
        }
      });
    }
    if (open) {
      window.document.body.style.overflow = "hidden";
    } else {
      window.document.body.style.overflow = "auto";
    }
  }, [scrolled, open]);

  return (
    <NavigationBar className={scrolled && "scrolled"}>
      {desktop ? (
        <>
          <Wrapper className="relative z-40">
            <div className="flex gap-10 items-center h-[80px]">
              <Logo
                className="justify-self-center opacity-50 cursor-pointer"
                onClick={() => navigate("/")}
              />
              <div className="nav-links flex gap-5 items-center mx-auto">
                <Link
                  to="/"
                  onClick={() => {
                    setProducers(false);
                    setProduction(false);
                  }}
                  className="uppercase text-sm text-white font-light opacity-50 hover:opacity-100"
                >
                  Início
                </Link>
                <Link
                  to="/about"
                  onClick={() => {
                    setProducers(false);
                    setProduction(false);
                  }}
                  className="uppercase text-sm text-white font-light opacity-50 hover:opacity-100"
                >
                  Sobre Nós
                </Link>
                {/* <Link
                  to="#"
                  className="uppercase text-sm text-white font-light opacity-50 hover:opacity-100"
                >
                  A Equipa
                </Link> */}
                <Link
                  to="/communications"
                  onClick={() => {
                    setProducers(false);
                    setProduction(false);
                  }}
                  className="uppercase text-sm text-white font-light opacity-50 hover:opacity-100"
                >
                  Comunicados
                </Link>
                <Link
                  to="/events"
                  onClick={() => {
                    setProducers(false);
                    setProduction(false);
                  }}
                  className="uppercase text-sm text-white font-light opacity-50 hover:opacity-100"
                >
                  Eventos
                </Link>
                <div
                  className="font-prompt uppercase text-sm text-white font-light opacity-50 hover:opacity-100 cursor-pointer"
                  onClick={() => {
                    setProduction(!production);
                    setProducers(false);
                  }}
                >
                  Produção
                </div>
                <div
                  className="font-prompt uppercase text-sm text-white font-light opacity-50 hover:opacity-100 cursor-pointer"
                  onClick={() => {
                    setProducers(!producers);
                    setProduction(false);
                  }}
                >
                  Produtores
                </div>
                <Link
                  to="/documents"
                  onClick={() => {
                    setProducers(false);
                    setProduction(false);
                  }}
                  className="uppercase text-sm text-white font-light opacity-50 hover:opacity-100"
                >
                  Documentação
                </Link>
                <Link
                  to="/contacts"
                  onClick={() => {
                    setProducers(false);
                    setProduction(false);
                  }}
                  className="uppercase text-sm text-white font-light opacity-50 hover:opacity-100"
                >
                  Contactos
                </Link>
              </div>
            </div>
          </Wrapper>
          {production && (
            <>
              <SecondaryNavigation className="relative z-20">
                <Leaf className="absolute -left-32 -top-20" />
                <Wrapper>
                  <div className="flex justify-end items-center w-full h-full relative z-10">
                    <div className="flex flex-col w-1/2 min-h-[250px] justify-center gap-10 pr-10 text-right">
                      <p className="uppercase text-white text-2xl">
                        
                      </p>
                      <Link
                        onClick={() => setProduction(false)}
                        to="/production/products"
                        className="text-white opacity-50 text-2xl uppercase hover:opacity-100"
                      >
                        Produtos
                      </Link>
                      <Link
                        onClick={() => setProduction(false)}
                        to="/production/announcements"
                        className="text-white opacity-50  text-2xl uppercase hover:opacity-100"
                      >
                        Anúncios
                      </Link>
                    </div>
                    <div className="flex flex-col w-1/2 min-h-[250px] justify-center gap-10 pl-10 py-5">
                      <HashLink
                        smooth
                        onClick={(e) => {
                          setProduction(false);
                        }}
                        to="/production#acquisitions"
                        className="text-white text-md underline"
                      >
                        Produção de Banana
                      </HashLink>
                      <HashLink
                        smooth
                        onClick={() => {
                          setProduction(false);
                        }}
                        to="/production#prices"
                        className="text-white text-md underline"
                      >
                        Preços à produção de Banana
                      </HashLink>
                      <HashLink
                        smooth
                        onClick={() => {
                          setProduction(false);
                        }}
                        to="/production#payments"
                        className="text-white text-md underline"
                      >
                        Pagamentos à produção
                      </HashLink>
                    </div>
                  </div>
                </Wrapper>
                <div className="secondaryColor" />
              </SecondaryNavigation>
              <div
                onClick={() => {
                  setProduction(false);
                }}
                className="fixed w-screen h-screen left-0 top-0 z-10"
              />
            </>
          )}
          {producers && (
            <>
              <SecondaryNavigation className="relative z-20">
                <Leaf className="absolute -left-32 -top-20" />
                <Wrapper>
                  <div className="flex justify-end items-center w-full h-full relative z-10">
                    <div className="flex flex-col w-1/2 min-h-[250px] justify-start gap-5 pr-10 text-right">
                      <p className="uppercase text-white text-2xl">
                        Qualidade e Segurança Alimentar
                      </p>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/nurseries"
                        className="text-white opacity-50 text-2xl uppercase hover:opacity-100"
                      >
                        Viveiros
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/insurance"
                        className="text-white opacity-50 text-2xl uppercase hover:opacity-100"
                      >
                        Seguros
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/aids"
                        className="text-white opacity-50 text-2xl uppercase hover:opacity-100"
                      >
                        Ajudas
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/media"
                        className="text-white opacity-50 text-2xl uppercase hover:opacity-100"
                      >
                        Multimédia
                      </Link>
                    </div>
                    <div className="flex flex-col w-1/2 min-h-[250px] justify-center gap-3 pl-10 py-5">
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/rules"
                        className="text-white  text-md underline"
                      >
                        Regras de higiene e boas práticas de segurança alimentar
                        na exploração
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/practices"
                        className="text-white text-md underline"
                      >
                        Boas práticas agrícolas
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/conditions"
                        className="text-white text-md underline"
                      >
                        Condicionalidade
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/quality"
                        className="text-white text-md underline"
                      >
                        Qualidade e segurança alimentar
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/pests"
                        className="text-white text-md underline"
                      >
                        Pragas, doenças e infestantes da cultura da bananeira
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/correctives"
                        className="text-white text-md underline"
                      >
                        Corretivos do solo
                      </Link>
                      <Link
                        onClick={() => setProducers(false)}
                        to="/producers/auxiliaries"
                        className="text-white text-md underline"
                      >
                        Auxiliares( Referente aos fitofarmacêuticos a respeitar
                        a biodiversidade)
                      </Link>
                    </div>
                  </div>
                </Wrapper>
                <div className="secondaryColor" />
              </SecondaryNavigation>
              <div
                onClick={() => {
                  setProducers(false);
                }}
                className="fixed w-screen h-screen left-0 top-0 z-10"
              />
            </>
          )}
        </>
      ) : (
        <Wrapper>
          <div className="w-full relative ">
            <div
              className={`flex h-[80px] items-center justify-between z-10 relative ${
                open && "bg-black transition-all duration-700 delay-100"
              }`}
            >
              <Logo
                className={`cursor-pointer ${
                  open ? "opacity-0" : "opacity-100"
                } transition-all`}
                onClick={() => navigate("/")}
              />
              {open ? (
                <MenuClose
                  onClick={() => setOpen(!open)}
                  className="ml-auto cursor-pointer"
                />
              ) : (
                <Menu
                  onClick={() => setOpen(!open)}
                  className="cursor-pointer"
                />
              )}
            </div>
            <div
              className={`mobilenavigation overscroll-contain overflow-auto mb-5 h-screen fixed bg-black w-screen left-0 z-[1] transition-all duration-300 ease-in-out ${
                open ? "top-0" : "top-[-10000px]"
              }`}
            >
              <Wrapper>
                <div className="flex flex-col mt-[100px] gap-5 ">
                  <Link
                    onClick={() => setOpen(false)}
                    to="/"
                    className="uppercase text-white text-xl font-medium"
                  >
                    Início
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/about"
                    className="uppercase text-white text-xl font-medium"
                  >
                    Sobre Nós
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/communications"
                    className="uppercase text-white text-xl font-medium"
                  >
                    Comunicados
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/events"
                    className="uppercase text-white text-xl font-medium"
                  >
                    Eventos
                  </Link>
                  <div className="flex flex-col">
                    <div
                      className={`${
                        production ? "border-b border-white" : "border-b-0"
                      } flex justify-between cursor-pointer transition-all`}
                      onClick={() => setProduction(!production)}
                    >
                      <p className="uppercase text-white text-xl font-medium">
                        Produção
                      </p>
                      {production ? (
                        <RemoveIcon className=" text-white" />
                      ) : (
                        <AddIcon className=" text-white" />
                      )}
                    </div>
                    <div
                      className={`${
                        production ? "h-full mt-5" : "h-0"
                      }  flex flex-col overflow-hidden transition-all gap-5 pl-3`}
                    >
                      <Link
                        onClick={() => setOpen(false)}
                        to="/production"
                        className="uppercase text-white text-md font-medium"
                      >
                        Informação
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/production/announcements"
                        className="uppercase text-white text-md font-medium"
                      >
                        Anúncios
                      </Link>
                    </div>
                  </div>
                  <div className="flex flex-col">
                    <div
                      className={`${
                        producers ? "border-b border-white" : "border-b-0"
                      } flex justify-between cursor-pointer transition-all`}
                      onClick={() => {
                        setProducers(!producers);
                        setQuality(false);
                      }}
                    >
                      <p className="uppercase text-white text-xl font-medium">
                        Produtores
                      </p>
                      {producers ? (
                        <RemoveIcon className=" text-white" />
                      ) : (
                        <AddIcon className=" text-white" />
                      )}
                    </div>
                    <div
                      className={`${
                        producers ? "h-full mt-5" : "h-0"
                      }  flex flex-col overflow-hidden transition-all gap-5 pl-3`}
                    >
                      <div className="flex flex-col">
                        <div
                          className={`flex justify-between cursor-pointer transition-all `}
                          onClick={() => setQuality(!quality)}
                        >
                          <p className="uppercase text-white text-lg font-medium">
                            Qualidade e Segurança Alimentar
                          </p>
                          {quality ? (
                            <ExpandLessIcon className=" text-white" />
                          ) : (
                            <ExpandMoreIcon className=" text-white" />
                          )}
                        </div>
                        <div
                          className={`${
                            quality ? "h-full mt-5" : "h-0"
                          }  flex flex-col overflow-hidden transition-all gap-5 pl-3`}
                        >
                          <Link
                            onClick={() => setOpen(false)}
                            to="/producers/rules"
                            className="uppercase text-white text-md font-normal"
                          >
                            Práticas de segurança alimentar
                          </Link>
                          <Link
                            onClick={() => setOpen(false)}
                            to="/producers/practices"
                            className="uppercase text-white text-md font-normal"
                          >
                            Boas práticas agrícolas
                          </Link>
                          <Link
                            onClick={() => setOpen(false)}
                            to="/producers/conditions"
                            className="uppercase text-white text-md font-normal"
                          >
                            Condicionalidade
                          </Link>
                          <Link
                            onClick={() => setOpen(false)}
                            to="/producers/quality"
                            className="uppercase text-white text-md font-normal"
                          >
                            Qualidade e segurança alimentar
                          </Link>
                          <Link
                            onClick={() => setOpen(false)}
                            to="/producers/pests"
                            className="uppercase text-white text-md font-normal"
                          >
                            Pragas, doenças e infestantes
                          </Link>
                          <Link
                            onClick={() => setOpen(false)}
                            to="/producers/correctives"
                            className="uppercase text-white text-md font-normal"
                          >
                            Corretivos do solo
                          </Link>
                          <Link
                            onClick={() => setOpen(false)}
                            to="/producers/auxiliaries"
                            className="uppercase text-white text-md font-normal"
                          >
                            Auxiliares
                          </Link>
                        </div>
                      </div>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/producers/nurseries"
                        className="uppercase text-white text-md font-medium"
                      >
                        Viveiros
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/producers/insurance"
                        className="uppercase text-white text-md font-medium"
                      >
                        Seguros
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/producers/aids"
                        className="uppercase text-white text-md font-medium"
                      >
                        Ajudas
                      </Link>
                      <Link
                        onClick={() => setOpen(false)}
                        to="/producers/media"
                        className="uppercase text-white text-md font-medium"
                      >
                        Multimédia
                      </Link>
                    </div>
                  </div>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/documents"
                    className="uppercase text-white text-xl font-medium"
                  >
                    Documentação
                  </Link>
                  <Link
                    onClick={() => setOpen(false)}
                    to="/contacts"
                    className="uppercase text-white text-xl font-medium"
                  >
                    Contactos
                  </Link>
                  <div className="flex justify-center mt-10">
                    <LogoFull
                      onClick={() => {
                        navigate("/");
                      }}
                      className="cursor-pointer"
                    />
                  </div>
                </div>
              </Wrapper>
            </div>
          </div>
        </Wrapper>
      )}
    </NavigationBar>
  );
}

export default NavBar;
