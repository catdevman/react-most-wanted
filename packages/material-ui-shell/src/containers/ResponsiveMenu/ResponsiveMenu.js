import PropTypes from 'prop-types'
import React from 'react'
import { SwipeableDrawer, styled } from '@mui/material'
import { useMenu } from 'material-ui-shell/lib/providers/Menu'
import { useTheme as useAppTheme } from 'material-ui-shell/lib/providers/Theme'
import { useConfig } from 'base-shell/lib/providers/Config'

const iOS = process.browser && /iPad|iPhone|iPod/.test(navigator.userAgent)

const CustomSwipeableDrawer = styled(SwipeableDrawer)(
  ({ theme, width, menucontext: { isDesktop, isMenuOpen, isMiniMode } }) => {
    if (isDesktop) {
      return {
        '& .MuiDrawer-paper': {
          position: 'relative',
          whiteSpace: 'nowrap',
          height: '100vh',
          overflowX: 'hidden',
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.leavingScreen,
          }),
          width:
            !isMiniMode && !isMenuOpen
              ? 0
              : !isMenuOpen
              ? theme.spacing(9)
              : width,
        },
      }
    } else {
      return {
        '& .MuiDrawer-paper': {
          height: '100vh',
          width,
          [theme.breakpoints.up('md')]: {
            position: 'relative',
          },
          transition: theme.transitions.create('width', {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
          }),
        },
      }
    }
  }
)

const ResponsiveMenu = ({ children }) => {
  const { isRTL } = useAppTheme()
  const config = useConfig()
  const width = config?.appConfig?.menu?.width || 240
  const menuContext = useMenu()
  const { toggleThis, isDesktop, isMenuOpen, isMobileMenuOpen } =
    menuContext || {}

  const handleDrawerToggle = () => {
    toggleThis('isMobileMenuOpen')
  }

  return (
    <div style={{ boxSizing: 'content-box' }}>
      <CustomSwipeableDrawer
        menucontext={menuContext}
        width={width}
        disableBackdropTransition={!iOS}
        disableDiscovery={iOS}
        variant={isDesktop ? 'permanent' : 'temporary'}
        onClose={handleDrawerToggle}
        anchor={!isDesktop ? undefined : isRTL ? 'right' : 'left'}
        open={isDesktop ? !!isMenuOpen : !!isMobileMenuOpen}
        onOpen={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
      >
        {children}
      </CustomSwipeableDrawer>
    </div>
  )
}
ResponsiveMenu.propTypes = {
  children: PropTypes.any,
}

export default ResponsiveMenu
