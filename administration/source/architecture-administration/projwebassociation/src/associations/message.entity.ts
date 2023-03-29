import { ApiProperty } from "@nestjs/swagger";

export class Message {
    @ApiProperty({
        description: "Email du destinataire",
        example: "john.doe@mail.com",
        type: String,
    })
    public email: string;

    @ApiProperty({
        description: "Objet du mail",
        example: "Réunion",
        type: String,
    })
    public subject: string;

    @ApiProperty({
        description: "Contenu du mail",
        example: "Vous êtes invité à la réunion de Vendredi.",
        type: String,
    })
    public text: string;

    @ApiProperty({
        description: "Calendrier ical",
        example: "...",
        type: String,
    })
    public ical: string;
}