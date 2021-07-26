import DataShow from "@/shared/Item/DataShow";
import HeaderWithBack from "@/shared/Item/HeaderWithBack";
import { instance } from "@/shared/services/api";
import { Divider } from "@material-ui/core";
import NextLink from "next/link";
import { Link as MUILink } from "@material-ui/core";

import React from "react";

export async function getServerSideProps(ctx) {
  const { id } = ctx.params;

  const { data: user } = await instance.get(`/api/taka/user/${id}`);
  return {
    props: {
      user,
    },
  };
}

export default function TakaUser({ user }) {
  return (
    <div style={{ maxWidth: 800, margin: "0px auto" }}>
      <HeaderWithBack title="Usuario" linkBack="/taka/users" />
      <Divider />
      <br />
      <DataShow
        schema={[
          [
            {
              content: "nickname",
              label: "Nick",
              size: 12,
            },
          ],
          [
            {
              content: "name",
              label: "Nome",
              size: 6,
            },
            {
              content: "birth",
              label: "Nascimento",
              size: 6,
            },
          ],
          [
            {
              content: "forWho",
              label: "Para quem",
              size: 12,
            },
          ],
          [
            {
              content: "otherName",
              label: "Nome Outro",
              size: 6,
            },
            {
              content: "otherBirth",
              label: "Nascimento Outro",
              size: 6,
            },
          ],
          [
            {
              content: "dateAccepted",
              label: "Aceito em",
              size: 12,
            },
          ],
          [
            {
              content: "ip",
              label: "Ip",
              size: 12,
            },
          ],
          [
            {
              content: "contract",
              label: "Contrato",
              size: 12,
              // eslint-disable-next-line react/display-name
              format: (value: string) => (
                <NextLink href={`/taka/contrato/item/${value}`} passHref>
                  <MUILink variant="body2">Contrato</MUILink>
                </NextLink>
              ),
            },
          ],
        ]}
        data={user}
      />
    </div>
  );
}
