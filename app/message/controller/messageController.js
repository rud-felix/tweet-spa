'use strict';

messageModule.controller('MessageController', [
    '$scope', '$location', 'MessagesFactory',
    MessageController
]);

function MessageController($scope, $location, MessagesFactory) {
    var self = this;

    self.context = {
        'text': null
    };

    self.add = function () {
        self.context.text = self.text;

        $scope.messages = MessagesFactory.addMessages.save(self.context, function () {
            self.text = '';
        });

        // TODO: view old + new messages
        //$scope.messages = MessagesFactory.followersMessages.query();
    };

    self.search = function() {
        self.context.text = self.text;

        $scope.messages = MessagesFactory.searchMessages.query(self.context, function () {
            self.text = '';
        });
    };

    // TODO: refactoring
    if ($location.path() == '/') {
        $scope.title = 'Followers messages';
        $scope.messages = MessagesFactory.followersMessages.query();
    }
    if ($location.path() == '/search/message') {
        $scope.title = 'Search messages';
        $scope.messages = MessagesFactory.searchMessages.query();
    }
}