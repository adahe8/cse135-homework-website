// LogRocket analytics set up
import LogRocket from 'logrocket';

LogRocket.init('ukfmeg/literallycreatessite');

// Identify the user (for demonstration purposes, using a static ID)
window.onload = function() {
    LogRocket.identify('TEST_USER_10000', {
        name: 'Carmen He',
        email: 'cah010@ucsd.edu',
    });
    LogRocket.identify('TEST_USER_20000', {
        name: 'Ada He',
        email: 'adhe@ucsd.edu',
    });
};
