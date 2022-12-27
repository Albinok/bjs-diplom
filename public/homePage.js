const logoutButton = new LogoutButton();

logoutButton.action = () => {
  ApiConnector.logout(request => {
    if(request.success){
      location.reload();
    }
  });
};

ApiConnector.current(request => {
  if (request.success){
    ProfileWidget.showProfile(request.data)
  }
});

const ratesBoard = new RatesBoard();

const gettingExchangeRates = () => {
  ApiConnector.getStocks((request) => {
    if (request.success){
      ratesBoard.clearTable();
      ratesBoard.fillTable(request.data);
    }
  });
};

gettingExchangeRates();
setInterval(gettingExchangeRates, 20_000);

//Операции с деньгами
const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
  ApiConnector.addMoney(data, (request) => {
    if (request.success){
      ProfileWidget.showProfile(request.data);
    }
    if (!request.success){
      moneyManager.setMessage(request.success, request.error);
    } else {
      moneyManager.setMessage(request.success, 'Счет пополнен');
    }
  });
};

moneyManager.conversionMoneyCallbac = (data) => {
  ApiConnector.convertMoney(data, (request) => {
    if(request.success){
      ProfileWidget.showProfile(request.data);
    }
    if (!request.success){
      moneyManager.setMessage(request.success, request.error);
    } else {
      moneyManager.setMessage(request.success, 'Конвертировано');
    }
  });
};

moneyManager.sendMoneyCallback = (data) => {
  ApiConnector.transferMoney(data, (request) => {
    if (request.success) {
      ProfileWidget.showProfile(request.data);
    }

    if (!request.success){
      moneyManager.setMessage(request.success, request.error);
    } else {
      moneyManager.setMessage(request.success, 'Перевод выполнен')
    }
  });
};

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((request) => {
  if (request.success) {
    favoritesWidget.clearTable();
    favoritesWidget.fillTable(request.data);
    favoritesWidget.updateUsersList(request.data);
  }
});

favoritesWidget.addUserCallback = (data) => {
  ApiConnector.addUserToFavorites(data, (request) => {
    if (request.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(request.data);
      favoritesWidget.updateUsersList(request.data);
    }

    if (!request.success){
      moneyManager.setMessage(request.success, request.error);
    } else {
      moneyManager.setMessage(request.success, 'Пользователь добавлен')
    }
  });
};

favoritesWidget.removeUserCallback = (data) => {
  ApiConnector.removeUserFromFavorites(data, (request) => {
    if (request.success) {
      favoritesWidget.clearTable();
      favoritesWidget.fillTable(request.data);
      favoritesWidget.updateUsersList(request.data);
    }

    if (!request.success){
      moneyManager.setMessage(request.success, request.error);
    } else {
      moneyManager.setMessage(request.success, 'Пользователь удален')
    }
  })
}


