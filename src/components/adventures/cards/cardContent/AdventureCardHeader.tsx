import { Typography, Divider, Chip, Stack, Badge, Box } from "@mui/material";
import { AdventureCardCommonProps } from "./AdventureCardCommonProps";

export default function AdventureCardHeader({
  adventure,
}: AdventureCardCommonProps) {
  return (
    <>
      <Box textAlign="center">
        <Badge badgeContent={adventure.system.name} color="secondary">
          <Typography variant="h5" component="div" sx={{ marginTop: 1 }}>
            {adventure.name}
          </Typography>
        </Badge>

        <Divider sx={{ marginBottom: "1rem" }} />
        <Stack
          direction="row"
          spacing={1}
          justifyContent="center"
          marginBottom={1}
        >
          {adventure.tags.map((tag) => {
            return (
              <Chip label={tag.name} color="info" key={crypto.randomUUID()} />
            );
          })}
        </Stack>
      </Box>
    </>
  );
}
