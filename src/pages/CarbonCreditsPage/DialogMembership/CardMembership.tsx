import React, { useState } from "react";
import { Button, Card, CardBody } from "@material-tailwind/react";
import { IMembership } from "../../../utils/interfaces";
import { useNavigate } from 'react-router-dom';
import WalletDialog from "../../WalletDialog";

export default function CardMembership({ data }: { data: IMembership }) {
  const [isOpen, setIsOpen] = useState(false);
  let navigate = useNavigate();

  return (<>
      <Card className="bg-primary">
        <CardBody className="flex flex-col items-center justify-between gap-4 h-full">
          <h5 className="text-center text-xl font-semibold text-white">
            {data.title}
          </h5>
          <div className="flex flex-col items-center justify-between gap-4 text-white">
            <span className="text-3xl md:text-4xl font-bold">${data.price}</span>
            <p className="text-sm md:text-base text-center">{data.description}</p>
            <Button className="bg-white text-primary" onClick={() => setIsOpen(true)}>Purchase</Button>
          </div>
        </CardBody>
      </Card>
      <WalletDialog isOpen={isOpen} handleClose={() => navigate('/')} />
    </>
  );
}