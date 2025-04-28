import React from "react";

type Props = {
    params: {
        inviteId: string;
    }
}

const InvitePage = async ({params}: Props) => {
    const {inviteId} = params;

    const invite = await prisma.invite.findUnique({
        where: {id: inviteId}
    })
}

export default InvitePage;