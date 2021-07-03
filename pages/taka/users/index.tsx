import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import Search from "@/shared/Search";
import { useTakaUserSearchProvider } from "@/src/taka/controller";
import Chip from "@material-ui/core/Chip";
import { useRouter } from "next/router";
import React from "react";

export default function TakaTagPage() {
  const history = useRouter();
  const searchProps = useTakaUserSearchProvider();

  const redirectEdit = ({ _id: id }: any) =>
    history.push(`/taka/users/item/${id}`);

  return (
    <Search
      {...searchProps}
      title={<HeaderWithBack title="Usuarios" linkBack="/taka" />}
      fieldsContent={[
        { label: "Nome", content: "name" },
        {
          label: "Para quem",
          content: "forWho",
          // eslint-disable-next-line react/display-name
          formatFun: (value) => <Chip label={value} variant="outlined" />,
        },
        {
          label: "Idade",
          content: "birth",
          // eslint-disable-next-line react/display-name
          formatFun: (birthday) => {
            birthday = new Date(birthday);
            // birthday is a date
            var ageDifMs = Date.now() - birthday.getTime();
            var ageDate = new Date(ageDifMs); // miliseconds from epoch
            return `${Math.abs(ageDate.getUTCFullYear() - 1970)} anos`;
          },
        },
      ]}
      crudProps={{
        edit: true,
        onEditClick: redirectEdit,
      }}
      fieldsSearchMain={[
        {
          content: [
            {
              lg: 12,
              name: "name",
              label: "Nome",
              variant: "standard",
            },
          ],
        },
      ]}
    />
  );
}
