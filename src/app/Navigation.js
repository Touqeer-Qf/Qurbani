import { Dashboard, ListAlt, Person, DisplaySettings } from "@mui/icons-material"
import colors from "./style/colors"

const styles = {
  iconSize: {
    p: 0.2,
    fontSize: "22px",
    color: colors.secondary,
  }
}

const Navigation = [
  {
    label: 'Dashboard',
    icon: <Dashboard sx={styles.iconSize} />,
    path: '/',
  },
  {
    label: 'Reports',
    icon: <ListAlt sx={styles.iconSize} />,
    path: '/report',
  },
]

export default Navigation