import React from "react";
import { Tab, Tabs as TabWrapper, TabList, TabPanel } from "react-tabs";
import { BuyCrypto } from "../BuyCrypto/BuyCrypto";
import "react-tabs/style/react-tabs.css";
import "./Tabs.sass";


export const Tabs: React.FC = () => {
  return (
    <>
      <TabWrapper className="tab">
        <TabList className="tabcontent">
          <Tab className="tab__link">Buy</Tab>
          <Tab className="tab__link">Sell</Tab>
          <Tab className="tab__link">Transfer</Tab>
        </TabList>

        <TabPanel className="board-tabcontent">
          <BuyCrypto />
        </TabPanel>
        <TabPanel className="board-tabcontent">
          {/* <SellCoin /> */}
        </TabPanel>
        <TabPanel className="board-tabcontent">
          {/* <TransferCoin /> */}
        </TabPanel>
      </TabWrapper>
    </>
  );
}
